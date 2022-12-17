const url = 'https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/';

const respond = (res) => {
  if (res.status < 300) return res.json();
  else if (res.status < 400) throw new Error(`${res.status}:Redirection Error`);
  else if (res.status < 500) throw new Error(`${res.status}:Client Error`);
  else if (res.status < 600) throw new Error(`${res.status}:Server Error`);
};

const api = {
  fetchRoot: async () => {
    const res = await fetch(url);
    return respond(res);
  },
  fetchNode: async (id) => {
    const res = await fetch(url + id);
    return respond(res);
  },
};

export default api;
