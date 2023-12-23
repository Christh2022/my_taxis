import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../Firebase.config";

const UseGetData = (collectionName) => {
    const [data, setData] = useState([])
    const collectionRef = collection(firestore, collectionName);
    useEffect(()=>{
        try {
            onSnapshot(collectionRef, (snapshot) => {
                setData(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
            });
        } catch (error) {
            console.log(error);
        }
    }, [])
    return {data};
}

export default UseGetData;
