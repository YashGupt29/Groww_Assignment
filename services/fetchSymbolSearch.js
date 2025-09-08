const API_KEY = 'demo'; // Replace with your actual API key for production

export const fetchSymbolSearch = async (keyword) => {
  if (!keyword) {
    return [];
  }
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${API_KEY}`
    );
    const data = await response.json();
    return data.bestMatches || [];
  } catch (error) {
    console.error('Error fetching symbol search:', error);
    return [];
  }
};
