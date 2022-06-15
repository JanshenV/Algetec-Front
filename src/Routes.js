
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

//Global Provider
import { GlobalProvider } from './context/GlobalContext';

export default function App() {
  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route path='/signup' exact element={<SignUp />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/home' exact element={<Home />} />
          <Route path='/' exact element={<Home />} />
        </Routes>
      </GlobalProvider>
    </Router>
  );
};

