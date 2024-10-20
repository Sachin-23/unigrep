searchReqSchema  = {
    "type" : "object",
     "properties" : {
        "search_types" : {
            "type" : "array",
            "items": {
                "type": "string" 
                }
            },
        "search_domains": {
            "type" : "array",
            "items": {
                "type": "string" 
                }
            },
        "search_locations": {
            "type" : "array",
            "items": {
                "type": "string" 
                }
            },
        "search_query": {"type": "string"},
        "search_query_type": {"type": "string"},
    },
    "required": [
        "search_types",
        "search_domains",
        "search_locations",
        "search_query",
        "search_query_type"
        ],
}

applyReqSchema = {
        "type": "object",
        "properties": {
            "operation": {"type": "string"},
            "operation_params": {
                "type": "object",
                "properties": {
                    "destination": {"type": "string"}
                    }
                },
            "query_set": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "source": {
                            "type": "object",
                            "properties": {
                                "domain": {"type": "string"},
                                "address": {"type": "string"}
                                }
                            },
                        "result": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "match_type": {"type": "string"},
                                    "path": {"type": "string"}
                                    }
                                }
                            }
                        },
                    },
                },
            }
        }
