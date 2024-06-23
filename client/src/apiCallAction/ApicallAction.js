
import Cookies from 'js-cookie'
const BASE_URL = "http://localhost:8080"
const jwtToken = Cookies.get('token') || ""


export const apiCall = async (endpoint, method, body = null) => {
  const url = `${BASE_URL}${endpoint}`;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${jwtToken}`
      },
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status !== 204) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  };