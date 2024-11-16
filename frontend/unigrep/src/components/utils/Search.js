import axios from 'axios';

export const performSearch = async (msg) => {
  try {
    console.log(msg)
    //till CORS fix, using dumy resp
    // const response = {
    //     "status": "ok",
    //     "statuscode": 200,
    //     "result_set": [
    //         {
    //             "source": {
    //                 "domain": "local",
    //                 "address": "/"
    //             },
    //             "result": [
    //                 {
    //                     "match_type": "filename",
    //                     "path": "/home/documents/1/File1a.doc"
    //                 },
    //                 {
    //                     "match_type": "filename",
    //                     "path": "/home/documents/1/File2a.doc"
    //                 }
    //             ]
    //         },
    //         {
    //             "source": {
    //                 "domain": "ftp",
    //                 "address": "ftp://ftp.iitb.ac.in/"
    //             },
    //             "result": [
    //                 {
    //                     "match_type": "filename",
    //                     "path": "/home/documents/1/File1a.doc"
    //                 }
    //             ]
    //         }
    //     ]
    // }
    const response = await axios.post('http://127.0.0.1:8000/api/search/', msg, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {

      return response.data.result_set; // Return the search result
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error during search request:', error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};
