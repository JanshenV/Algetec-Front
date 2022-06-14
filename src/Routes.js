import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login";
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
        <Route path='/' exact element={<Login />} />
      </Routes>
    </Router>
  );
};

