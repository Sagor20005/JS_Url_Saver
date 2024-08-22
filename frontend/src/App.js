import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Card from './Component/Card'
import AdminLogin from './AdminComponent/Login'
import PrivetAdmin from './AdminComponent/PrivetAdmin'
import Admin from './AdminComponent/Admin'
import AddUser from './AdminComponent/AddUser'
import AddAccount from './Component/AddAccount'
import UserLogin from './Component/Login'
import PrivetUser from './Component/PrivetComponent'
import Profile from './Component/Profile'
import Qr from './Component/Qr'
import Home from './Component/Home'
import ChangePass from './Component/ChangePass'
import UpdateUser from './AdminComponent/UpdateUser'

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/*PRIVET ADMIN COMPONENTS*/}
            <Route element={<PrivetAdmin/>}>
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/add-user" element={<AddUser/>}/>
              <Route path="/update-user/:id" element={<UpdateUser/>}/>
            </Route>
            {/* PRIVET USER COMPONRNT */}
            <Route element={<PrivetUser/>}>
              <Route path="/add-account/:id" element={<AddAccount/>}/>
              <Route path="/profile/:id" element={<Profile />}/>
              <Route path="/change-password/:id" element={<ChangePass />}/>
            </Route>
            {/* GENARLE ROUTE*/}
            <Route path="/admin-login" element={<AdminLogin/>}/>
            <Route path="/card/:id" element={<Card/>}/>
            <Route path="/user-login" element={<UserLogin/>}/>
            <Route path="/qr/:id" element={<Qr/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;