// SEARCH API DEFINITION
// localhost:XYZ/api/search

REQUEST = {
	"search_types": [ "within_files", "filenames" ],

	"search_domains": [ "local", "ftp" ],

	"search_locations": [
		"/home/documents/1",
		"/home/documents/2"
	],

	"search_query": "File.*a.doc",
	"search_query_type": "regex"
}

// Request handler CALLS a function to handle all of the searching, which is
// part of our internal library we will write.

// RESPONSE from server can be 200 or 500 or 400 or whatever.

OK_RESPONSE = {
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
		// ...
	]
}

ERROR_RESPONSE = {
	"status": "error",
	"statuscode": "500",
	"error_messages": [
		"Failed to access ftp server.",
	],
	"partial_result": true,
	"result_set": [
		{
			"source": { "domain": "local", "address": "/" },
			"result": [
				{ "match_type": "filename", "path": "/home/documents/1/File1a.doc"},
				{ "match_type": "filename", "path": "/home/documents/1/File2a.doc"}
			]
		}

		//...
	]
}


// APPLY API DEFINITION
// localhost:XYZ/api/apply


REQUEST = {
	"operation": "copy",
	"operation_params": {
		"destination": "/home/user/b"
	},

	"query_set": [
		{
			"source": { "domain": "local", "address": "/" },
			"result": [
				{ "match_type": "filename", "path": "/home/documents/1/File1a.doc"},
				{ "match_type": "filename", "path": "/home/documents/1/File2a.doc"}
			]
		}

		//...
	]
}

RESPONSE = {
	"status": "ok",
	"statuscode": "200",
	"response_type": "table", // can be table, status, string, file (base64) etc.
	"response": {
		"a": [],
		"b": [],
		"c": []
	}
}


ERROR_RESPONSE = {
	"status": "error",
	"statuscode": "500",
	"error_messages": [
		"Failed to access ftp server.",
	],
	"partial_response": true,
	"response_type": "table",
	"response": {
		"a": [],
		"b": [],
		"c": []
	}
}
