import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './stores/index.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Video } from './pages/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/video/:vName' element={<Video />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
