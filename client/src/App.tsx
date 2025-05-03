import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import { Explore } from './pages/ExplorePage';
import { SeeBlog } from './pages/SeeBlog';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
// import { Footer } from './components/Footer';
 

function App() {
  return (
    <Router>
      <Navbar />
     
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path="/explore" element={<Explore></Explore>} />
        <Route path="/:id" element={<SeeBlog></SeeBlog>} />
        <Route path="/auth/signin" element={<SignIn></SignIn>} />
        <Route path="/auth/signup" element={<SignUp></SignUp>} />
        <Route path="/new" element={<h1>New Blog Page</h1>} />
      </Routes>
      {/* <Footer></Footer> */}
    </Router>
  );
}

export default App;