const post = (dest, obj) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    const params = obj.entries().map(p => `${p[0]}=${p[1]}`).join('&');

    xhr.onload = () => {
      const response = xhr.responseText;
      console.log(`INFO: response === "${response}"`);
      resolve(JSON.parse(response));
    };

    xhr.open('POST', `${dest}?${params}`);
    xhr.send();
  });
};

const get = (dest) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      const response = xhr.responseText;
      console.log(`INFO: response === "${response}"`);
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
      console.log(`INFO: response === "${response}"`);
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
      console.log(`INFO: response === "${response}"`);
      resolve(JSON.parse(response));
    };

    xhr.open('DELETE', dest);
    xhr.send();
  });
};

export { post, get, put, del };
