import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import firebaseConfig from './firebase.config.js';
import { PersistGate} from 'redux-persist/integration/react'
import { store, persistor } from './redux/Store.js'
import './index.css'
import "slick-carousel/slick/slick.css";
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
       <PersistGate loading={"loading"} persistor={persistor}>
       <App />

       </PersistGate>
    </Provider>
       
  
)