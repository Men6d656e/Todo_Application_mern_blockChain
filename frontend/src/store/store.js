// import { configureStore } from '@reduxjs/toolkit';
// import counterSlice from "./ContractSlice.js";
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';


// export const store = configureStore({
//   reducer: {
//     SolidityContract: counterSlice,
//   }, // Add your reducers here
// });

// store/store.js

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterSlice from './ContractSlice.js'; // Import the slice

const rootReducer = combineReducers({
  SolidityContract: counterSlice,
});

const persistConfig = {
  key: 'root', // key for localStorage
  storage, // storage engine
  whitelist: ['SolidityContract'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  // Add middleware to handle serialization issues if needed
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
          },
      }),
});

export const persistor = persistStore(store);