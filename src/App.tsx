import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ThankYouPage from './components/ThankYouPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<LandingPage />} /> {/* Fallback route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;