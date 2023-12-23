import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../Firebase.config';

const UserAuth = () => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else setCurrentUser(user);
        });
    }, []);
    return { currentUser};
}

export default UserAuth;
