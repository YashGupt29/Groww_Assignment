import axios from 'axios';
import { ALPHAVANTAGE_API_KEY } from '@env';

const API_BASE_URL = 'https://www.alphavantage.co/query';

export const fetchTimeSeriesData = async (symbol, duration) => {
  let params = {
    apikey: ALPHAVANTAGE_API_KEY,
    symbol: "IBM",
  };

  let dataKey;

  switch (duration) {
    case '1D':
      params.function = 'TIME_SERIES_INTRADAY';
      params.interval = '5min';
      params.outputsize = 'full';
      dataKey = 'Time Series (5min)';
      break;
    case '1W':
      params.function = 'TIME_SERIES_DAILY';
      params.outputsize = 'compact'; // Get enough data for 1 week
      dataKey = 'Time Series (Daily)';
      break;
    case '1M':
      params.function = 'TIME_SERIES_DAILY';
      params.outputsize = 'full'; // Get enough data for 1 month
      dataKey = 'Time Series (Daily)';
      break;
    case '3M':
    case '6M':
    case '1Y':
      params.function = 'TIME_SERIES_DAILY';
      params.outputsize = 'full';
      dataKey = 'Time Series (Daily)';
      break;
    case 'YTD':
    case '5Y':
    case 'MAX':
      params.function = 'TIME_SERIES_MONTHLY';
      params.outputsize = 'full';
      dataKey = 'Monthly Time Series';
      break;
    default:
      params.function = 'TIME_SERIES_DAILY';
      params.outputsize = 'compact';
      dataKey = 'Time Series (Daily)';
  }

  try {
    const response = await axios.get(API_BASE_URL, {
        params: {
          function: 'TIME_SERIES_DAILY',  
          symbol: 'IBM',                  
          apikey: ALPHAVANTAGE_API_KEY,   
        },
      });
    const timeSeries = response.data[dataKey];


    if (!timeSeries) {
      throw new Error(`No time series data found for ${symbol} with duration ${duration}`);
    }

    let formattedData = Object.keys(timeSeries).map(date => ({
      date: date,
      close: parseFloat(timeSeries[date]['4. close']),
    })).reverse(); 

    const now = new Date();
    switch (duration) {
      case '1W':
        const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
        formattedData = formattedData.filter(item => new Date(item.date) >= oneWeekAgo);
        break;
      case '1M':
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        formattedData = formattedData.filter(item => new Date(item.date) >= oneMonthAgo);
        break;
      case '3M':
        const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
        formattedData = formattedData.filter(item => new Date(item.date) >= threeMonthsAgo);
        break;
      case '6M':
        const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
        formattedData = formattedData.filter(item => new Date(item.date) >= sixMonthsAgo);
        break;
      case '1Y':
        const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
        formattedData = formattedData.filter(item => new Date(item.date) >= oneYearAgo);
        break;
      default:
        break;
    }
    return formattedData;
  } catch (error) {
    console.error(`Error fetching time series data for ${symbol} (${duration}):`, error);
    throw error;
  }
};
