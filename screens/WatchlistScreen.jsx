import React from 'react';
import StockListScreen from './StockListScreen';

function WatchlistScreen({ navigation }) {
  const watchlistData = [
    { ticker: "AAPL", name: "Apple Inc", price: 177.15, change_percentage: "+4.15%" },
    { ticker: "TSLA", name: "Tesla Inc", price: 278.50, change_percentage: "+3.42%" },
    { ticker: "MSFT", name: "Microsoft Corp", price: 332.20, change_percentage: "+2.88%" },
    { ticker: "GOOGL", name: "Alphabet Inc", price: 138.75, change_percentage: "+2.35%" },
    { ticker: "AMZN", name: "Amazon.com Inc", price: 137.00, change_percentage: "-2.15%" },
    { ticker: "NFLX", name: "Netflix Inc", price: 392.80, change_percentage: "-1.72%" },
    { ticker: "NVDA", name: "NVIDIA Corp", price: 468.50, change_percentage: "-1.25%" },
    { ticker: "META", name: "Meta Platforms", price: 302.10, change_percentage: "-0.95%" },
    { ticker: "SMCI", name: "Super Micro Computer", price: 800.00, change_percentage: "+10.15%" },
    { ticker: "AMD", name: "Advanced Micro Devices", price: 180.50, change_percentage: "+5.20%" },
    { ticker: "GOOG", name: "Google Inc", price: 140.75, change_percentage: "+2.00%" },
    { ticker: "FB", name: "Facebook Inc", price: 305.10, change_percentage: "-1.00%" }
  ];

  return (
    <StockListScreen title="My Watchlist" data={watchlistData} navigation={navigation} />
  );
}

export default WatchlistScreen;
