// store/ContractSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contractAddress: null,
  account: null,
};

export const counterSlice = createSlice({
  name: 'SolidityContract',
  initialState,
  reducers: {
    setContract: (state, action) => {
      state.contractAddress = action.payload.contractAddress;
      state.account = action.payload.account;
      console.log(state.account,state.contractAddress);
    },
    deleteContract: (state) => {
      state.contractAddress = null;
      state.account = null;
    },
  },
});

export const { setContract, deleteContract } = counterSlice.actions;

export default counterSlice.reducer;