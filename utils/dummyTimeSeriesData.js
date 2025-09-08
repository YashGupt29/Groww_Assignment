export const generateDummyTimeSeriesData = async (duration, symbol = 'IBM') => {
    const data = [];
    const now = new Date();
    let numDays;

    switch (duration) {
      case '1D':
        numDays = 200; 
        break;
      case '1W':
        numDays = 300; 
        break;
      case '1M':
        numDays = 400;
        break;
      case '3M':
        numDays = 500;
        break;
      case '6M':
        numDays = 600;
        break;
      case '1Y':
        numDays = 700;
        break;
      default:
        numDays = 200; 
    }

    let basePrice = 150;
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    for (let i = 0; i < numDays; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() - (numDays - 1 - i));
        const formattedDate = date.toISOString().slice(0, 10);
        
        basePrice += (Math.random() - 0.5) * 5; 
        const closePrice = Math.max(10, basePrice + (Math.random() * 10 - 5)); 

        data.push({
            date: formattedDate,
            close: parseFloat(closePrice.toFixed(2)),
        });
    }
    return data;
};
