import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Explore />} />
          <Route exact path='/offers' element={<Offers />} />

          <Route path='/category/:categoryName' element={<Category />} />

          <Route exact path='/profile' element={<PrivateRoute />} >
            <Route exact path='/profile' element={<Profile />} />
          </Route>

          <Route exact path='/sign-in' element={<SignIn />} />
          <Route exact path='/sign-up' element={<SignUp />} />
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
          <Route exact path='/create-listing' element={<CreateListing />} />

          <Route path='/edit-listing/:listingId' element={<EditListing/>} />

          <Route path='/category/:categoryName/:listingId' element={<Listing/>} />

          <Route path='/contact/:landlordId' element={<Contact/>} />
          
        </Routes>

        {/* Navbar */}
        <Navbar />
      </Router>

      {/* React Toastify */}
      <ToastContainer/>
    </>
  )
}

export default App;
