let doRequest = async function (url, options) {
  try {
    let result = await fetch(url, options);
    return result.json();
  } catch(err) {
    console.log(err);
  }  
};

export default doRequest;