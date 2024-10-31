from pathlib import Path
import pandas as pd
import zipfile
from typing import Iterable, List

SUPPORTED_DOMAINS: List[str] = [
    "local",
    "ssh"
]

##
## Stores the information about a query
##
class Query:
    def __init__(self,
            search_types: List[str]      = [ "filenames" ],
            search_domain: str           = "local",
            search_locations: List[str]  = [ "/" ],
            search_query: str            = "",
            search_query_type: str       = "glob"
        ) -> None:
        self.search_types      = search_types
        self.search_domain     = search_domain
        self.search_locations  = search_locations
        self.search_query      = search_query
        self.search_query_type = search_query_type

    def run_query(self):
        pass

class File:
    def __init__(self, domain: str, path: str):
        self.file: Path  = Path(path)
        self.domain: str = domain


    ##
    ## Gets the contents of the entire file.
    ##
    ## :returns:   The full file
    ## :rtype:     bytes
    ##
    def get_full(self) -> bytes:
        raise NotImplementedError()

    ##
    ## Gets the first n bytes from the file
    ##
    ## :returns:   The n.
    ## :rtype:     str
    ##
    def get_n(self, n: int) -> str:
        raise NotImplementedError()

    ##
    ## Deletes the file.
    ##
    def delete(self) -> None:
        raise NotImplementedError()

##
## This class is returned after a query is completed.
##
class QueryResponse:
    @staticmethod
    def new_response_df() -> pd.DataFrame:
        return pd.DataFrame(columns = pd.Series([
            "domain",
            "file_path",
            "match_type"
        ]))

    def __init__(self):
        self.response_df = None

    def get_file_list(self) -> List[File]:
        raise NotImplementedError()

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
        return pd.DataFrame()

##
## Implements a driver for a local filesystem
##
class LocalDriver(Driver):
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
    raise NotImplementedError()

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