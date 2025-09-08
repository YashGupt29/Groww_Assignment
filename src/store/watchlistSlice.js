import { createSlice } from '@reduxjs/toolkit';

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    watchlists: {
      'default': { id: 'default', name: 'My Watchlist', items: [] },
    },
  },
  reducers: {
    createWatchlist: (state, action) => {
      const { id, name } = action.payload;
      state.watchlists[id] = { id, name, items: [] };
    },
    addToWatchlist: (state, action) => {
      const { watchlistId, stock } = action.payload;
      if (state.watchlists[watchlistId]) {
        const existingStock = state.watchlists[watchlistId].items.find(item => item.symbol === stock.symbol);
        if (!existingStock) {
          state.watchlists[watchlistId].items.push(stock);
        }
      }
    },
    removeFromWatchlist: (state, action) => {
      const { watchlistId, symbol } = action.payload;
      if (state.watchlists[watchlistId]) {
        state.watchlists[watchlistId].items = state.watchlists[watchlistId].items.filter(item => item.symbol !== symbol);
      }
    },
  },
});

export const { createWatchlist, addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
