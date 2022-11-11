import './auth.css';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IoEyeOutline, IoEyeOffOutline, IoLogoGoogle } from 'react-icons/io5';
import { toast } from 'react-toastify';
// A U T H E N T I C A T I O N
import { db } from '../../firebase.config';
import { setDoc, doc } from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import GoogleAuth from './GoogleAuth';
const Signup = () => {
    // S H O W    P A S S W O R D
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);
    // H O O K    F O R M
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    // S U B M I T    H A N D L E R
    const onSubmit = async (data) => {
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            const user = userCredential.user;
            updateProfile(auth.currentUser, { displayName: data.username });
            // ADD USER TO FIRESTORE
            const userData = { ...data };
            delete userData.password;
            delete userData.confirmPassword;
            delete userData.terms;
            userData.timestamp = new Date().toDateString();
            // MORE RELATED DATA ADDED
            userData.bio = '';
            userData.avatar = '';
            userData.fav = [];
            userData.properties = [];
            userData.requests = [];
            userData.reviews = [];
            userData.history = [];
            await setDoc(doc(db, 'users', user.uid), userData);
            navigate('/');
        } catch (error) {
            toast.error('Something went wrong try again ❗');
        }
    };
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-5xl mb-10">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* R O W 1 */}
                <div className="grid md:grid-cols-2 md:gap-10">
                    {/* U S E R   N A M E */}
                    <div className="relative z-0 mb-10 w-full group">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="on"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                            placeholder=" "
                            {...register('username', { required: true })}
                        />
                        <label
                            htmlFor="username"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Username
                        </label>
                        {/* V A L I D A T I O N */}
                        {errors.username?.type === 'required' && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                Username is required.
                            </p>
                        )}
                    </div>
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
                                Email is required.
                            </p>
                        )}
                        {errors.email?.type === 'pattern' && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                Please enter a valid email.
                            </p>
                        )}
                    </div>
                </div>
                {/* R O W 2 */}
                <div className="grid md:grid-cols-2 md:gap-10">
                    {/* P A S S W O R D */}
                    <div className="relative z-0 mb-10 w-full group">
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
                                Password is required.
                            </p>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                minLength is 8 characters..
                            </p>
                        )}
                    </div>
                    {/*  C O N F I R M    P A S S W O R D */}
                    <div className="relative z-0 mb-10 w-full group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            id="confirmPassword"
                            autoComplete="on"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                            placeholder=" "
                            {...register('confirmPassword', {
                                validate: (val) => {
                                    if (watch('password') !== val) {
                                        return 'Your passwords is not match';
                                    }
                                },
                            })}
                        />
                        <label
                            htmlFor="confirmPassword"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Confirm Password
                        </label>
                        {errors.confirmPassword?.type === 'validate' && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                Password is not match.
                            </p>
                        )}
                    </div>
                </div>
                {/* R O W 3 */}
                <div className="grid md:grid-cols-2 md:gap-10">
                    {/* P H O N E */}
                    <div className="relative z-0 mb-10 w-full group">
                        <input
                            type="phone"
                            name="phone"
                            id="phone"
                            autoComplete="on"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                            placeholder=" "
                            {...register('phone', { required: true })}
                        />
                        <label
                            htmlFor="phone"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Phone Number
                        </label>
                        {/* V A L I D A T I O N */}
                        {errors.phone?.type === 'required' && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                Phone number is required.
                            </p>
                        )}
                    </div>
                    {/*  G E N D E R */}
                    <div className="relative z-0 mb-10 w-full group">
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <select
                                    id="gender"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                                    {...field}
                                    {...register('gender', { required: true })}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            )}
                        />
                        <label
                            htmlFor="gender"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Gender
                        </label>
                        {/* V A L I D A T I O N */}
                        {errors.gender?.type === 'required' && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                Please select the gender.
                            </p>
                        )}
                    </div>
                </div>
                {/* A G R E E     T R E M S */}
                <div className="mb-10">
                    <input
                        id="terms"
                        type="checkbox"
                        value=""
                        {...register('terms', { required: true })}
                        className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-0 focus:ring-cyan-100 checked:bg-cyan-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                    />
                    <label
                        htmlFor="terms"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        I agree with the{' '}
                        <span className="text-cyan-600 hover:underline dark:text-cyan-600">
                            terms and conditions
                        </span>
                    </label>
                    {/* V A L I D A T I O N */}
                    {errors.terms?.type === 'required' && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            You have to accept our terms and conditions.
                        </p>
                    )}
                </div>
                {/* R O U T E    T O    S I G N   I N */}
                <div className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-10">
                    Already have account ?
                    <Link
                        to="/signin"
                        className="text-cyan-600 ml-1 hover:underline dark:text-cyan-600"
                    >
                        Sign in
                    </Link>
                </div>
                {/* S U B M I T */}
                <button
                    type="submit"
                    className="text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-800 focus:outline-none dark:focus:ring-cyan-800 transition-all transition-500"
                >
                    Sign up
                </button>
                {/* S I G N    I N    W I T H    G O O G L E */}
            </form>
            <GoogleAuth page={'Sign up'} />
        </div>
    );
};

export default Signup;
