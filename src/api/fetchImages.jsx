import axios from 'axios';
import Notiflix from 'notiflix';

export const notifySettings = {
  width: '380px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  fontSize: '20px',
  borderRadius: '12px',
};

export async function fetchImages(searchQuery, page) {
  const API_KEY = '30790248-497145c5d3b0c6576ca9c953f';

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });

  const url = `https://pixabay.com/api/?${searchParams}`;

  const response = await axios.get(url);
  if (response.status === 404) {
    Notiflix.Notify.failure(
      'К сожелению ничего не найдено, поробуйте ещё раз',
      notifySettings
    );
    return Promise.reject();
  }
  return response;
}