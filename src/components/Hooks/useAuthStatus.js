import { useEffect, useState, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../Store/user';
import { authActions } from '../Store/authentication';
export const UseAuthStatus = () => {
    const isMounted = useRef(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    console.log(checkingStatus);
    // ADD USER DATA IN REDUX STORE
    const dispatch = useDispatch();
    const getUserData = async (userID) => {
        const docRef = doc(db, 'users', userID);
        const docSnapshot = await getDoc(docRef);
        dispatch(
            userActions.updateUserData({
                ...docSnapshot.data(),
                timestamp: new Date().toDateString(),
                id: userID,
            })
        );
    };
    useEffect(() => {
        if (isMounted) {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setIsLoggedIn(true);
                    dispatch(authActions.authStatus(true));
                    getUserData(user.uid);
                } else {
                    dispatch(authActions.authStatus(false));
                }
                setCheckingStatus(false);
                dispatch(authActions.setIsLoading(false));
            });
        }
        setCheckingStatus(false);
        return () => {
            isMounted.current = false;
        };
    }, []);
    return { isLoggedIn, checkingStatus };
};
