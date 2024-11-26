import axios from 'axios';

export const performApply = async (msg) => {
  try {
    console.log('in apply',msg)
    // const response = {
    //   "status": 200,

    //   "data": {
    //     "path": {
    //       "0": "/tmp/b/a (copy 11).doc",
    //       "1": "/tmp/b/a ( copy 12).doc",
    //       "2": "/tmp/b/a (copy 3).doc",
    //       "3": "/tmpibla (copy 10).doc",
    //       "4": "/tmp/b/a (copy 7).doc",
    //       "5": "/tmp/b/a lcopy 5).doc",
    //       "6": "/tmpibla (copy.2).doc",
    //       "7": "/tmp/b/a.doc"
    //     },
    //     "domain": {

    //     },
    //     "address": {

    //     }
    //   }
    // }
    const response = await axios.post('http://127.0.0.1:8000/api/apply/', msg, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('response is ', response)
    // if (response.status === 200) {

    //   return response.data; // Return the search result
    // } else {
    //   throw new Error('Failed to fetch data');
    // }
  } catch (error) {
    console.error('Error during Apply request:', error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};
