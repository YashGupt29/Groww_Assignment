import axios from 'axios';
import { ALPHAVANTAGE_API_KEY } from '@env';

const API_BASE_URL = 'https://www.alphavantage.co/query';

export const fetchCompanyOverview = async (symbol) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        function: 'OVERVIEW',
        symbol: symbol,    
        apikey: ALPHAVANTAGE_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching company overview:', error);
    throw error;
  }
};
