import axios from 'axios';

export function navigationPost(coordinates: string) {
  const url = `http://47.243.58.57:3003/api`;
  const body = {
    coord: coordinates,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(url, body)
      .then(res => {
        console.log('POST res: ', res.data);
        if (res.data?.route) resolve(res.data?.route);
        else reject('No data');
      })
      .catch(err => {
        reject(err);
      });
  });
}
