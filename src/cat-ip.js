import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_rAp3iQfYqT29LRK1jk351WavOSWLBIc0N85ucIgDdz5Q2Lp0xjGRUBw4FfIBV6KC';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds(endPoint) {
  return axios.get(endPoint).then(data => {
    return data.data;
  });
}

export function fetchCatByBreed(endPoint, breedId) {
  const catByBreed = endPoint + '?breed_ids=' + breedId;
  return axios.get(catByBreed).then(resp => {
    return resp.data;
  });
}
