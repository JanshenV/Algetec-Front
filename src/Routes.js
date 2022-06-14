
//Components
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";

//React
import {
  Route,
  Routes,
  BrowserRouter as Router
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' exact element={<SignUp />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/home' exact element={<Home />} />
        <Route path='/' exact element={<Home />} />
      </Routes>
    </Router>
  );
};

