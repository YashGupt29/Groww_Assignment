import { ALPHAVANTAGE_API_KEY } from '@env';

export const fetchSymbolSearch = async (keyword) => {
  if (!keyword) {
    return [];
  }
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword.toLowerCase()}&apikey=${ALPHAVANTAGE_API_KEY}`
    );
    const data = await response.json();
    return data.bestMatches || [];
  } catch (error) {
    console.error('Error fetching symbol search:', error);
    return [];
  }
};
