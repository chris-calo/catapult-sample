const post = (dest, obj) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();

    /*
    const params = Object.entries(obj).map(p => {
      return `${p[0]}=${p[1]}`;
    }).join('&');

    console.log(`params : "${params}"`);
    */

    xhr.onload = () => {
      const response = xhr.responseText;
      console.log(`TRACE: response === "${response}"`);
      resolve(JSON.parse(response));
    };

    xhr.open('POST', dest);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(obj));
  });
};

const get = (dest) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      const response = xhr.responseText;
      console.log(`TRACE: response === "${response}"`);
      resolve(JSON.parse(response));
    };

    xhr.open('GET', dest);
    xhr.send();
  });
};

const put = (dest) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      const response = xhr.responseText;
      console.log(`TRACE: response === "${response}"`);
      resolve(JSON.parse(response));
    };

    xhr.open('PUT', dest);
    xhr.send();
  });
};

const del = (dest) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      const response = xhr.responseText;
      console.log(`TRACE: response === "${response}"`);
      resolve(JSON.parse(response));
    };

    xhr.open('DELETE', dest);
    xhr.send();
  });
};

export { post, get, put, del };
