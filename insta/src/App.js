import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './components/Login';
import Sign from './components/Sign';
import Otp from './components/Otp';
import Home from './components/Home'
import Profile from './components/Profile';
import Save from './components/Save';
import Problem from './components/Problem';
import Logout from './components/Logout';

function App() {
  return (
   <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/login' element={<Login/>}/> 
        <Route path='/sign' element={<Sign/>}/>
        <Route path='/otp' element={<Otp/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/save' element={<Save/>}/>
        <Route path='/problem' element={<Problem/>}/>
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
    </Router>
   </>
  );
}

export default App;
