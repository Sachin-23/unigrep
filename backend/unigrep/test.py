import requests
import json

msg = { 
       "search_type": "filenames",
       "search_domain": "local",
       "search_locations":  ["/home/documents/1", "/home/documents/2"], 
       "search_query": "File.*a.doc",
       "search_query_type": "regex"
       }

res = requests.post("http://127.0.0.1:8000/api/search/", json=msg)
print(res.status_code)
print(res.json())

msg = { 
       "operation": "copy",
       "operation_params": {
           "destination": "/home/user/"
           },
       "query_set": [
           {
           "source": {"domain": "local", "address": "/"},
            "result": [
                { "match_type": "filename", "path": "/home/documents/1/File1a.doc"},
                { "match_type": "filename", "path": "/home/documents/1/File2a.doc"}
               ],
            }
           ],
       }

res = requests.post("http://127.0.0.1:8000/api/apply/", json=msg)
print(res.status_code)
print(res.json())

