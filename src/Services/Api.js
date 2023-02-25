import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=33210195-55532a6eed5f942a9f206b283&image_type=photo&orientation=horizontal';

export default async function fetchImages(query, page) {
  const response = await axios.get(`&q=${query}&page=${page}&per_page=12`);
  return response.data;
}
