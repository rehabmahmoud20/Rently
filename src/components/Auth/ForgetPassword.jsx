import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import './auth.css';
const ForgetPassword = () => {
    // H O O K    F O R M
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // S U B M I T    H A N D L E R
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, data.email);
            toast.success('Email sent successfully');
            navigate('/signin');
        } catch (error) {
            toast.error('Could not send reset email');
        }
    };
    return (
        <section className="forget-password py-12 h-screen">
            <div className="container mx-auto h-full">
                <h1 className="text-5xl mb-10">Reset Password</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* E M A I L */}
                    <div className="relative z-0 mb-5 w-full group">
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
                                Enter a valid email.
                            </p>
                        )}
                    </div>
                    {/* R O U T E    T O    S I G N   IN */}
                    <div className="text-md font-medium text-cyan-600 dark:text-gray-300 hover:underline hover:text-cyan-600 mb-5">
                        <Link to="/signin">Sign in</Link>
                    </div>
                    {/* S U B M I T */}
                    <button
                        type="submit"
                        className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-3 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Send email
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ForgetPassword;
