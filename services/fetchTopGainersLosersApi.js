import axios from 'axios';
import { ALPHAVANTAGE_API_KEY } from '@env';

const API_BASE_URL = 'https://www.alphavantage.co/query';

const api = axios.create({
  baseURL: API_BASE_URL,
});
export const fetchTopGainersLosers = async () => {
  try {
    const response = await api.get('', {
      params: {
        function: 'TOP_GAINERS_LOSERS',
        apikey: ALPHAVANTAGE_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top gainers and losers:', error);
    throw error;
  }
};

