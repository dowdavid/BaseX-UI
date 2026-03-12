import { createRoot } from 'react-dom/client';
import { Agentation } from 'agentation';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Agentation endpoint="http://localhost:4747" />
  </>,
);
