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
import { lazy, Suspense } from 'react';
import NotFoundPage from './components/Shared/NotFoundPage';
import Spinner from './components/Shared/Spinner';
import { useSelector } from 'react-redux';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import Navigate from './components/Shared/Navigate';

function App() {
    const isLoggedIn = useSelector((state) => state.authentication.isLoggedin);
    const isLoading = useSelector((state) => state.authentication.isLoading);
    const HomeComponent = lazy(() => import('./components/Home/Home'));
    return (
        <BrowserRouter>
            <NavbarComponent />
            <main className="min-h-screen relative">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<Spinner />}>
                                <HomeComponent />
                            </Suspense>
                        }
                    />
                    <Route
                        path="signin"
                        element={
                            isLoggedIn && !isLoading ? (
                                <NotFoundPage />
                            ) : !isLoggedIn && !isLoading ? (
                                <Signin />
                            ) : (
                                <Spinner />
                            )
                        }
                    />
                    <Route
                        path="signup"
                        element={
                            isLoggedIn && !isLoading ? (
                                <NotFoundPage />
                            ) : !isLoggedIn && !isLoading ? (
                                <Signup />
                            ) : (
                                <Spinner />
                            )
                        }
                    />
                    <Route
                        path="forget-password"
                        element={
                            isLoggedIn && !isLoading ? (
                                <NotFoundPage />
                            ) : !isLoggedIn && !isLoading ? (
                                <ForgetPassword />
                            ) : (
                                <Spinner />
                            )
                        }
                    />
                    <Route
                        path="favourits"
                        element={
                            !isLoggedIn && !isLoading ? (
                                <NotFoundPage />
                            ) : isLoggedIn && !isLoading ? (
                                <Favourits />
                            ) : (
                                <Spinner />
                            )
                        }
                    />
                    <Route
                        path="profile/*"
                        element={
                            !isLoggedIn && !isLoading ? (
                                <NotFoundPage />
                            ) : isLoggedIn && !isLoading ? (
                                <Profile />
                            ) : (
                                <Spinner />
                            )
                        }
                    />
                    <Route
                        path="add-rental"
                        element={
                            !isLoggedIn && !isLoading ? (
                                <NotFoundPage />
                            ) : isLoggedIn && !isLoading ? (
                                <AddRental />
                            ) : (
                                <Spinner />
                            )
                        }
                    />
                    <Route
                        path="rental-details/:id"
                        element={<RentalDetails />}
                    />
                    <Route path="rental-list" element={<RentalList />} />
                    <Route path="about" element={<About />} />
                    <Route path="FAQ" element={<FAQ />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/spinner" element={<Spinner />} />
                    <Route
                        path="terms&conditions"
                        element={<TermsAndConditions />}
                    />
                </Routes>
                {/* toast container "alert from react toastify" don't add it again ❗*/}
                <ToastContainer autoClose={4000} />
                <Navigate navigate={NavigateTop} />
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
