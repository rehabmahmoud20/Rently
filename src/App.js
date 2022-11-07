// global styles
import './Sass/Style.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import ForgetPassword from './components/Auth/ForgetPassword';
import Profile from './components/Profile/Profile';
import Favourits from './components/Favourits/Favourits';
import Home from './components/Home/Home';
import RentalDetails from './components/Rental/RentalDetails';
import RentalList from './components/Rental/RentalList/RentalList';
import FAQ from './components/FAQ/FAQ';
import About from './components/About/About';
import AddRental from './components/AddRental/AddRental';
import NavbarComponent from './components/Shared/NavbarComponent';
import { UseAuthStatus } from './components/Hooks/useAuthStatus';
function App() {
    const { isLoggedIn } = UseAuthStatus();
    return (
        <BrowserRouter>
            <NavbarComponent />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="signup" element={<Signup />} />
                    <Route
                        path="forget-password"
                        element={<ForgetPassword />}
                    />
                    <Route path="favourits" element={<Favourits />} />
                    {isLoggedIn && (
                        <Route path="profile/*" element={<Profile />} />
                    )}
                    <Route path="rental-details" element={<RentalDetails />} />
                    <Route path="rental-list" element={<RentalList />} />
                    <Route path="add-rental" element={<AddRental />} />
                    <Route path="about" element={<About />} />
                    <Route path="FAQ" element={<FAQ />} />
                </Routes>
                {/* toast container "alert from react toastify" don't add it again ❗*/}
                <ToastContainer autoClose={5000} />
            </main>
        </BrowserRouter>
    );
}

export default App;
