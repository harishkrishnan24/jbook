import React from 'react-dom';
import ReactDOM from 'react-dom/client';

const App = () => {
    return <h1>hi</h1>
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

root.render(<App />);