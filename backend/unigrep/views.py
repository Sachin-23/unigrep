from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import traceback

# from jsonschema import validate
# from unigrep.schemas import searchReqSchema, applyReqSchema

from marshmallow import Schema, fields

from .libunigrep.types import QuerySchema, ApplySchema
from .libunigrep.types import LocalDriver, FTPDriver, SSHDriver
from .libunigrep.types import result_to_json, process_apply

# Create your views here.
@csrf_exempt
def search(request):
    '''Search regex pattern in the provided path'''

    result = {}

    try:
        msg = json.loads(request.body)
        print("DBG Request: ", msg)
        query = QuerySchema.from_dict(msg)

        match query.search_domain:
            case "local":
                driver = LocalDriver()
            case "ftp":
                driver = FTPDriver()
            case "sftp" | "ssh":
                driver = SSHDriver()
            case _:
                raise ValueError(f"Driver not defined for {query.search_query_type}.")

        data = driver.search(query)
        print(data)
        result = result_to_json(data)
        print(result)
        print("DBG: ", query, type(query))
         
    except json.JSONDecodeError as e:
        return JsonResponse({"Error": f"Invalid JSON supplied: {e}" }, status = 400)

    except Exception as e:
        print(traceback.format_exc())
        return JsonResponse({"Error": str(e)}, status = 500)

    return HttpResponse(result, content_type='application/json', status = 200)


@csrf_exempt
def apply(request):

    applydata = {}
    try:
        msg = json.loads(request.body)
        print("DBG Request: ", msg)
        applydata = ApplySchema.from_dict(msg)
    except json.JSONDecodeError as e:
        return JsonResponse({"Error": f"Invalid JSON supplied: {e}" })
    except Exception as e:
        return JsonResponse({"Error": str(e)})

    try:
        if applydata.operation == "download":
            file = process_apply(applydata)

            return file
        else:
            log_text = process_apply(applydata)

            return JsonResponse({
                "log": log_text,
                "status": 200
            }, status=200)
    except Exception as e:
        return JsonResponse({"Error": str(e)})

