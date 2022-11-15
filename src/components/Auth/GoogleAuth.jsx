import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import { ReactComponent as GoogleIcon } from './googleIcon.svg';
const GoogleAuth = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const googleAuthHandler = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // CHECK FOR USER
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            // IF USER DOESN'T EXIST => CREATE USER
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    username: user.displayName,
                    email: user.email,
                    avatar: user.photoURL,
                    phone: '',
                    gender: '',
                    bio: '',
                    fav: [],
                    properties: [],
                    requests: [],
                    reviews: [],
                    history: [],
                    timestamp: serverTimestamp(),
                });
            }
            navigate('/');
        } catch (error) {
            toast.error('Could not authorize with google');
        }
    };
    return (
        <div className="text-sm mt-5 text-center font-medium text-gray-900 dark:text-gray-300 ">
            {props.page} with Google{' '}
            <GoogleIcon
                onClick={googleAuthHandler}
                width="25px"
                height="25px"
                className="inline cursor-pointer ml-1"
            />
        </div>
    );
};

export default GoogleAuth;
