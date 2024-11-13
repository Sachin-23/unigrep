from enum import Enum
from inspect import Arguments
from pathlib import Path
import re
import shutil
import pandas as pd
import zipfile
import fnmatch
from ftputil import FTPHost
from marshmallow import Schema, fields
from typing import Iterable, List, TextIO, Tuple

SUPPORTED_DOMAINS: List[str] = [
    "local",
    "ssh"
]

# DomainEnum = Enum("local", "ftp", "ssh")
# SearchTypeEnum = Enum("filenames", "filecontents")
# SearchQueryTypeEnum = Enum("glob", "regex")

def new_result_set() -> pd.DataFrame:
    return pd.DataFrame(columns = [
        "path",
        "match_type",
        "matched_on",
        "matched_on_type",
        "domain",
        "address"
    ])

def append_to_result(frame: pd.DataFrame,
    path: str | None = None,
    match_type: str | None = None,
    matched_on: str | None = None,
    matched_on_type: str | None = None,
    domain: str | None = None,
    address: str = ""):
    if not path or not match_type or not matched_on or not domain:
        raise ValueError("Arguments cannot be null.")
    frame.loc[len(frame)] = {
        "path": path,
        "match_type": match_type,
        "matched_on": matched_on,
        "matched_on_type": matched_on_type,
        "domain": domain,
        "address": address
    }

class ResultSchema(Schema):
    domain = fields.Str()
    address = fields.Str()
    results = fields.List(fields.Str())

def result_to_json(frame: pd.DataFrame) -> str:
    ret = frame["path", "domain", "address"].to_json()
    if ret == None:
        raise RuntimeError("Internal Error: result dataframe is null")
    return ret


##
## Stores the information about a query
##
class Query:
    def __init__(self,
            search_type: str             = "filenames",
            search_domain: str           = "local",
            root_address: str            = "",
            search_locations: List[str]  = [ "/" ],
            search_query: str            = "",
            search_query_type: str       = "glob",
            recursion_depth: int         = 5,
            auth_username: str | None    = None,
            auth_password: str | None    = None,
        ) -> None:
        self.search_type       = search_type
        self.search_domain     = search_domain
        self.search_locations  = search_locations
        self.search_query      = search_query
        self.search_query_type = search_query_type
        self.root_address      = root_address
        self.recursion_depth   = recursion_depth
        self.auth_username     = auth_username
        self.auth_password     = auth_password

class QuerySchema(Schema):
    search_type       = fields.Str()
    search_domain     = fields.Str()
    search_locations  = fields.List(fields.Str())
    search_query      = fields.Str()
    search_query_type = fields.Str()

class File:
    def __init__(self, domain: str, path: str, file_object: TextIO):
        self.file: Path  = Path(path)
        self.domain: str = domain
        self.file_object = file_object

##
## Abstract "Driver" class that actually performs a query and reads a file.
##
class Driver:
    def __init__(self):
        pass

    ##
    ## Searches for all files based on the quwey
    ##
    ## :param      query:                The query
    ## :type       query:                str
    ## :param      query_type:           The query type
    ## :type       query_type:           str
    ## :param      search_locations:     The search locations
    ## :type       search_locations:     { type_description }
    ##
    ## :returns:   A dataframe with all the matches.
    ## :rtype:     pd.DataFrame
    ##
    ## :raises     NotImplementedError:  This is an abstract class. Use the
    ##             derived classes.
    ##
    def search(self, query: Query) -> pd.DataFrame:
        raise NotImplementedError()

    def open_file(self, path: Path | str) -> File:
        raise NotImplementedError()
##
## Implements a driver for a local filesystem
##
class LocalDriver(Driver):
    def search(self, query: Query) -> pd.DataFrame:
        result = new_result_set()

        if query.search_domain != "local":
            raise ValueError("Domain is not 'local'")

        if query.search_type == "filenames":
            for location in query.search_locations:
                if query.search_query_type == "glob":
                    locpath = Path(location)
                    files = locpath.rglob(query.search_query)
                    for file in files:
                        append_to_result(result,
                            path = str(file),
                            match_type = "filenames",
                            matched_on = query.search_query,
                            matched_on_type = "glob",
                            domain = "local",
                            address = query.root_address)

                elif query.search_query_type == "regex":
                    locpath = Path(location)
                    regex = re.compile(query.search_query)
                    files = locpath.rglob("*")
                    for file in files:
                        if regex.search(str(file)):
                            append_to_result(result,
                                path = str(file),
                                match_type = "filenames",
                                matched_on = query.search_query,
                                matched_on_type = "regex",
                                domain = "local",
                                address = query.root_address)
                else:
                    raise ValueError("Unknown search query type")
        elif query.search_type == "filecontents":
            for location in query.search_locations:
                if query.search_query_type == "glob":
                    locpath = Path(location)
                    files = locpath.rglob("*")
                    for file in files:
                        if not file.is_file():
                            continue
                        with open(file, "r") as fh:
                            for line in fh:
                                if fnmatch.fnmatch(line, query.search_query):
                                    append_to_result(result,
                                        path = str(file),
                                        match_type = "filecontents",
                                        matched_on = query.search_query,
                                        matched_on_type = "glob",
                                        domain = "local",
                                        address = query.root_address)
                                    break

                elif query.search_query_type == "regex":
                    locpath = Path(location)
                    regex = re.compile(query.search_query)
                    files = locpath.rglob("*")
                    for file in files:
                        if not file.is_file():
                            continue
                        with open(file, "r") as fh:
                            for line in fh:
                                if regex.search(str(line)):
                                    append_to_result(result,
                                        path = str(file),
                                        match_type = "filecontents",
                                        matched_on = query.search_query,
                                        matched_on_type = "regex",
                                        domain = "local",
                                        address = query.root_address)
                                    break
                else:
                    raise ValueError("Unknown search query type")
        else:
            raise ValueError("Unknown search type")

        return result

    def open_file(self, path: Path | str) -> File:
        return File(
            domain = "local",
            path = str(path),
            file_object = open(path, "r")
        )

    def copy(self, src: Path | str, dest: Path | str):
        shutil.copy2(src, dest)

    def move(self, src: Path | str, dest: Path | str):
        shutil.move(src, dest)

    def delete(self, src: Path | str):
        Path(src).unlink()

RECURSION_DEPTH_HARD_LIMIT = 6

class FTPDriver(Driver):
    @staticmethod
    def match_name(search_query_type: str, pattern, regex, value: str) -> bool:
        if search_query_type == "regex":
            return regex.search(value)
        elif search_query_type == "glob":
            return fnmatch.fnmatch(value, pattern)
        else:
            raise ValueError("Unknown search type")

    def search(self, query: Query) -> pd.DataFrame:
        result = new_result_set()

        if query.search_domain != "ftp":
            raise ValueError("Domain is not 'ftp'")

        ftp = None

        if query.auth_username != None and query.auth_password != None:
            ftp = FTPHost(query.root_address, query.auth_username, query.auth_password)
        else:
            ftp = FTPHost(query.root_address, "anonymous", "")

        regex = None
        if query.search_query_type == "regex":
            regex = re.compile(query.search_query)

        if query.search_type == "filenames":
            for location in query.search_locations:
                stack: List[Tuple[str, int]] = []
                stack.append((location, 1))
                print(f"Traversing: {location}")
                while len(stack) > 0:
                    location, depth = stack.pop()
                    if depth > query.recursion_depth or depth > RECURSION_DEPTH_HARD_LIMIT:
                        continue
                    try:
                        ftp.chdir(location)
                    except Exception as e:
                        print(f"Location {location} cannot be accessed.")
                        continue

                    files = []

                    try:
                        files = ftp.listdir(location)
                    except Exception as e:
                        print(f"Cannot list files at {location}")
                        continue

                    for file in files:
                        if ftp.path.isdir(file):
                            print(f"Adding dir: {file}")
                            stack.append((
                                str(location + "/" + str(file)),
                                depth + 1))
                        elif self.match_name(
                            query.search_query_type,
                            query.search_query,
                            regex,
                            str(file)):
                            print(f"Adding file: {file}")
                            append_to_result(result,
                                path = location + "/" + str(file),
                                match_type = "filenames",
                                matched_on = query.search_query,
                                matched_on_type = query.search_query_type,
                                domain = "ftp",
                                address = query.root_address)
        elif query.search_type == "filecontents":
            raise NotImplementedError("Sorry, FTP File content searching is not implemented.")
        else:
            raise ValueError("Unknown search type")

        return result

    def open_file(self, path: Path | str) -> File:
        return File(
            domain = "local",
            path = str(path),
            file_object = open(path, "r")
        )

class SSHDriver(Driver):
    pass

##
## Gets the domain from a location string
##
## :param      location:  The location
## :type       location:  str
##
## :returns:   The domain from location.
## :rtype:     str
##
def get_domain_from_location(location: str) -> str:
    regex = re.compile(r"^(([A-Za-z]+)\:)?.*$")

    match = regex.match(location)

    if not match:
        return "empty"

    if match[2] == "file" or match[2] == "local":
        return "local"
    elif match[2] == "ftp":
        return "ftp"
    elif match[2] == "sftp" or match[2] == "ssh":
        return "ssh"
    else:
        return "invalid"

##
## Makes a zip file out of a listing.
##
## :param      files:  The files
## :type       files:  { type_description }
##
## :returns:   { description_of_the_return_value }
## :rtype:     Zipfile
##
def make_zip(files: Iterable[File]) -> zipfile.ZipFile:
    raise NotImplementedError()

# def _test():
#     s = FTPDriver()
#     result = s.search(Query(
#         search_locations=[ "/msstore" ],
#         search_domain= "ftp",
#         search_type="filenames",
#         search_query="*",
#         search_query_type="glob",
#         root_address="ftp.iitb.ac.in"
#     ))

#     print(result)


# _test()