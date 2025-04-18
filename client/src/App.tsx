import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1 >Landing Page</h1>} />
        <Route path="/explore" element={<h1>Explore Page</h1>} />
        <Route path="/:id" element={<h1>Blog Detail Page</h1>} />
        <Route path="/auth" element={<h1>Auth Page</h1>} />
        <Route path="/new" element={<h1>New Blog Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;