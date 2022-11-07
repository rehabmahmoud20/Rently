import './auth.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
// A U T H E N T I C A T I O N
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import GoogleAuth from './GoogleAuth';
const Signin = () => {
    // S H O W    P A S S W O R D
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);
    // H O O K    F O R M
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    // S U B M I T    H A N D L E R
    const onSubmit = async (data) => {
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            if (userCredential.user) navigate('/');
        } catch (error) {
            toast.error('You entered incorrect data ❗');
        }
    };
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-5xl mb-10">Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* E M A I L */}
                <div className="relative z-0 mb-10 w-full group">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="on"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                        placeholder=" "
                        {...register('email', {
                            required: true,
                            pattern:
                                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        })}
                    />
                    <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email
                    </label>
                    {/* V A L I D A T I O N */}
                    {errors.email?.type === 'required' && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            Enter your email.
                        </p>
                    )}
                    {errors.email?.type === 'pattern' && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            Please enter a valid email.
                        </p>
                    )}
                </div>
                {/* P A S S W O R D */}
                <div className="relative z-0 mb-5 w-full group">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        autoComplete="on"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                        placeholder=" "
                        {...register('password', {
                            required: true,
                            minLength: 8,
                        })}
                    />
                    <label
                        htmlFor="password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Password
                    </label>
                    {/* S H O W    P A S S W O R D */}
                    {!showPassword && (
                        <IoEyeOutline
                            onClick={toggleShowPassword}
                            className="text-cyan-600 absolute right-1 top-5 cursor-pointer"
                        />
                    )}
                    {showPassword && (
                        <IoEyeOffOutline
                            onClick={toggleShowPassword}
                            className="text-cyan-600 absolute right-1 top-5 cursor-pointer"
                        />
                    )}
                    {/* V A L I D A T I O N */}
                    {errors.password?.type === 'required' && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            Enter your password.
                        </p>
                    )}
                    {errors.password?.type === 'minLength' && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            Invalid password.
                        </p>
                    )}
                </div>
                {/* R O U T E    T O    F O R G E T   P A S S W O R D */}
                <div className="text-sm font-medium text-gray-400 dark:text-gray-300 hover:underline hover:text-cyan-600 mb-5">
                    <Link to="/forget-password">Forgot password ?</Link>
                </div>
                {/* R O U T E    T O    S I G N   UP */}
                <div className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-5">
                    Don't have account ?
                    <Link
                        to="/signup"
                        className="text-cyan-600 ml-1 hover:underline dark:text-cyan-600"
                    >
                        Sign Up
                    </Link>
                </div>
                {/* S U B M I T */}
                <button
                    type="submit"
                    className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-3 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Sign in
                </button>
                {/* S I G N    I N    W I T H    G O O G L E */}
            </form>
            <GoogleAuth page={'Sign in'} />
        </div>
    );
};

export default Signin;
