import axios from 'axios';

export default async function getDptThreads() {
  if (localStorage.getItem('dptThreads')) {
    try {
      return JSON.parse(localStorage.getItem('dptThreads'));
    } catch (e) {
      localStorage.removeItem('dptThreads');
      return {};
    }
  }

  return await axios.get('http://localhost:8000/api/threads');
}
