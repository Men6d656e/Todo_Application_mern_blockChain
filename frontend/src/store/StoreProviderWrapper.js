// "use client";
// import { Provider } from 'react-redux';
// import { store } from "./store.js";


// function StoreProviderWraper({children}) {
//     return (
//       <Provider store={store} >
//         {children}
//       </Provider>
//     )
//   }
  
//   export default StoreProviderWraper;

"use client";
import { Provider } from 'react-redux';
import { store, persistor } from "./store.js"; // Import persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

function StoreProviderWrapper({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default StoreProviderWrapper;