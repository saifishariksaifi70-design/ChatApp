import './App.css'
import Login from './components/pages/Login'
import { ToastContainer} from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/pages/Register1';
import { VerifyUser } from './components/pages/VerifyUser';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route element={<VerifyUser/>}>
          <Route path='/' element={<Home/>} />
        </Route>
        </Routes>
      
      
      <ToastContainer/>
    </div>
  )
}

export default App
