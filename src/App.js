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
import RentalDetails from './components/Rental/RentalDetails/RentalDetails';
import RentalList from './components/Rental/RentalList/RentalList';
import FAQ from './components/FAQ/FAQ';
import About from './components/About/About';
import AddRental from './components/AddRental/AddRental';
import NavbarComponent from './components/Shared/NavbarComponent';
import Footer from './components/Shared/Footer';
import NotFoundPage from './components/Shared/NotFoundPage';
import Spinner from './components/Shared/Spinner';
import { useSelector } from 'react-redux';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
function App() {
    const isLoggedIn = useSelector((state) => state.authentication.isLoggedin);
    return (
        <BrowserRouter>
            <NavbarComponent />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {!isLoggedIn && (
                        <Route path="signin" element={<Signin />} />
                    )}
                    {!isLoggedIn && (
                        <Route path="signup" element={<Signup />} />
                    )}
                    {!isLoggedIn && (
                        <Route
                            path="forget-password"
                            element={<ForgetPassword />}
                        />
                    )}
                    <Route path="favourits" element={<Favourits />} />
                    {isLoggedIn && (
                        <Route path="profile/*" element={<Profile />} />
                    )}
                    <Route
                        path="rental-details/:id"
                        element={<RentalDetails />}
                    />
                    <Route path="rental-list" element={<RentalList />} />
                    <Route path="terms-and-conditions" element={<TermsAndConditions />} />

                    <Route path="add-rental" element={<AddRental />} />

                    <Route path="about" element={<About />} />
                    <Route path="FAQ" element={<FAQ />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/spinner" element={<Spinner />} />
                </Routes>
                {/* toast container "alert from react toastify" don't add it again ❗*/}
                <ToastContainer autoClose={5000} />
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
