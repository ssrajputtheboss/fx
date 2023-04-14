import axios from 'axios';
export const ENDPOINT = 'http://172.16.202.38:4000'; //'http://localhost:4000';
axios.defaults.baseURL = ENDPOINT;

export async function openFolder(path, page) {
  const res = await axios.get('/folder' + path + '?page=' + page);
  return res.data || { files: [], noOfPages: 1 };
}
