import Axios from 'axios';

import { NETWORKING } from '../config/'

export default (baseUrl) => {

  async function get(){
    const url = `${baseUrl}`;
    return await Axios.get(url);
  }

  async function searchPhotos(data){
    const url = `${baseUrl}/search`;
    return await Axios.post(url, data);
  }

  async function savePhotos(data) {
    const url = `${baseUrl}/save`;
    return await Axios.post(url, data);
  }

  return {
    get,
    searchPhotos,
    savePhotos
  }

}