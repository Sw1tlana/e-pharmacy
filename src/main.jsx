import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from './context/ModalContext';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js';

import 'modern-normalize';
import './index.css';
import App from './components/App/App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
          <ModalProvider>
            <App />
          </ModalProvider>
      </BrowserRouter>
    </PersistGate> 
    </Provider>
  </StrictMode>
)
