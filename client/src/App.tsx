import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path="/explore" element={<h1>Explore Page</h1>} />
        <Route path="/:id" element={<h1>Blog Detail Page</h1>} />
        <Route path="/auth/signin" element={<h1>sign in</h1>} />
        <Route path="/auth/signup" element={<h1>sign up</h1>} />
        <Route path="/new" element={<h1>New Blog Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;