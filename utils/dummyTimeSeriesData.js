export const generateDummyTimeSeriesData = async (duration, symbol = 'IBM') => {
    const data = [];
    const now = new Date();
    let numDays;

    switch (duration) {
      case '1D':
        numDays = 20; // Approximately 1 day of 5-min intervals shown as daily for simplicity
        break;
      case '1W':
        numDays = 7; 
        break;
      case '1M':
        numDays = 30;
        break;
      case '3M':
        numDays = 90;
        break;
      case '6M':
        numDays = 180;
        break;
      case '1Y':
        numDays = 365;
        break;
      default:
        numDays = 30; // Default to 1 month
    }

    let basePrice = 150;
    await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
    for (let i = 0; i < numDays; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() - (numDays - 1 - i));
        const formattedDate = date.toISOString().slice(0, 10);
        
        // Simulate price fluctuation
        basePrice += (Math.random() - 0.5) * 5; // Random fluctuation up to +/- 2.5
        const closePrice = Math.max(10, basePrice + (Math.random() * 10 - 5)); // Ensure price doesn't go too low

        data.push({
            date: formattedDate,
            close: parseFloat(closePrice.toFixed(2)),
        });
    }
    return data;
};
