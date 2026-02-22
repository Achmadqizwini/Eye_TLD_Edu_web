import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import WebsitePage from './pages/WebsitePage';
import FlipbookPage from './pages/FlipbookPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/website" element={<WebsitePage />} />
        <Route path="/flipbook" element={<FlipbookPage />} />
      </Routes>
    </Router>
  );
}

export default App;