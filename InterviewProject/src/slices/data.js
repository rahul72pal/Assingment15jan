import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jsonData: [],
    priceStats: [],
    inventory_count: [],
    avg_msrp: [],
};

const admindataSclice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setjsonData(state, value) {
      state.jsonData = value.payload;
    },
    setpriceStats(state, value) {
      state.priceStats = value.payload;
    },
    setinventorycount(state, value) {
      state.inventory_count = value.payload;
    },
    setAvgmsrp(state, value) {
      state.avg_msrp = value.payload;
    },
  },
});

export const { setAvgmsrp, setinventorycount, setjsonData, setpriceStats} =
admindataSclice.actions;
export default admindataSclice.reducer;
