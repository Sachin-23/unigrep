from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# from jsonschema import validate
# from unigrep.schemas import searchReqSchema, applyReqSchema

from marshmallow import Schema, fields

from .libunigrep.types import QuerySchema
from .libunigrep.types import LocalDriver, FTPDriver, SSHDriver
from .libunigrep.types import result_to_json

# Create your views here.
@csrf_exempt
def search(request):
    '''Search regex pattern in the provided path'''

    try:
        msg = json.loads(request.body)
        print("DBG Request: ", msg)
        query = QuerySchema.from_dict(msg) 

        match query.search_domain:
            case "local":
                driver = LocalDriver()
            case "ftp":
                driver = FTPDriver()
            case "sftp": # NOTE: Change this to SFTP or SSH
                driver = SSHDriver()
            case _:
                raise ValueError(f"Driver not defined for {query.search_query_type}.")

        result = result_to_json(driver.search(query))
        print(result)
        print("DBG: ", query, type(query))
         
    except Exception as e:
        return JsonResponse({"Error": str(e)})

    noError = True
    '''...processing...'''
    dummyRes = {
            "status": "ok",
            "statuscode": "200",
            "result_set": [
                {
                    "source": { "domain": "local", "address": "/" },
                    "result": [
                        { "match_type": "filename", "path": "/home/documents/1/File1a.doc"},
                        { "match_type": "filename", "path": "/home/documents/1/File2a.doc"}
                        ]
                    },
                {
                    "source": { "domain": "ftp", "address": "ftp://ftp.iitb.ac.in/" },
                    "result": [
                        { "match_type": "filename", "path": "/home/documents/1/File1a.doc"}
                        ]
                    },
                ]
            }
    if noError:
        return JsonResponse(dummyRes)
    else:
        return JsonResponse({"Error": "Dummy Error"})

@csrf_exempt
def apply(request):
    '''NOTE: WRITE DESCRIPTION FOR THIS'''
    try:
        msg = json.loads(request.body)
        print(msg)
        validate(msg, schema=applyReqSchema)
    except Exception as e:
        return JsonResponse({"Error": str(e)})

    noError = True
    '''...processing...'''
    dummyRes = {
            "status": "ok",
            "statuscode": "200",
            "response_type": "table",
            "response": {
                "a": [],
                "b": [],
                "c": []
                }
            }
    if noError:
        return JsonResponse(dummyRes)
    else:
        return JsonResponse({"Error": "Dummy Error"})
    return HttpResponse("Not implemented. Apply function.")

