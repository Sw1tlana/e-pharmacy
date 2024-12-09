import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from './context/ModalContext';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';
import { persistor, store } from './redux/store';

import 'modern-normalize';
import './index.css';
import App from './components/App/App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
          <ModalProvider>
            <Toaster position="top-center" reverseOrder={false} /> 
              <App />
          </ModalProvider>
      </BrowserRouter>
    </PersistGate> 
    </Provider>
  </StrictMode>
)
