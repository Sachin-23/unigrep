from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from jsonschema import validate
from unigrep.schemas import searchReqSchema, applyReqSchema

# Create your views here.
@csrf_exempt
def search(request):
    '''Search regex pattern in the provided path'''
    try:
        msg = json.loads(request.body)
        validate(msg, schema=searchReqSchema)
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

