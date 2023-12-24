import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth, firestore } from "../Firebase.config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import UseFonction from "../Hooks/UseFonction";

const SignUp = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [prenom, setPrenom] = useState();
    const [Age, setAge] = useState();
    const [address, setAddress] = useState();
    const [tel, setTel] = useState();
    const { handleDay } = UseFonction();

    // Function to handle the submit event of the form.
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !email &&
            !password &&
            !name &&
            !prenom &&
            !Age &&
            !address &&
            !tel
        ) {
            toast.error("veuillez remplir tous les champs");
        } else {
            try {
                const credential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = credential.user;

                //mise à jour du profile
                await updateProfile(user, {
                    displayName: name + " " + prenom,
                });
                // const timestamp = serverTimestamp()
                //insertion des données dans le firestore
                await setDoc(doc(firestore, "utilisateur", user.uid), {
                    id: user.uid,
                    nom: name,
                    prenom,
                    email,
                    tel,
                    Age,
                    address,
                    info_entreprise: {
                        taxis: [
                            {
                                title: "benoit 16",
                                shortDesc: "",
                                description: "",
                                price: 1850000,
                            },
                            {
                                title: "benoit 16",
                                shortDesc: "",
                                description: "",
                                price: 1850000,
                            },
                            {
                                title: "benoit 16",
                                shortDesc: "",
                                description: "",
                                price: 2850000,
                            },
                        ],
                        chauffeur: [
                            {
                                nom: "Mampassi Christh",
                                id: "aeaze124azeaze6azeaze897",
                                recette: [
                                    { date: handleDay(0), montant: 2000 },
                                    { date: handleDay(1), montant: 2000 },
                                ],
                                depense: [
                                    { date: handleDay(0), montant: 100 },
                                    { date: handleDay(1), montant: 100 },
                                ],
                            },
                            {
                                nom: "Moukietou Roldi",
                                id: "aeaze124azeaze6azeaze8971",
                                recette: [
                                    { date: handleDay(0), montant: 2000 },
                                    { date: handleDay(1), montant: 2000 },
                                ],
                                depense: [
                                    { date: handleDay(0), montant: 100 },
                                    { date: handleDay(1), montant: 100 },
                                ],
                            },
                        ],
                    },
                    timestamp: serverTimestamp(),
                });
                toast.success("Vos données sont bien enregistrées .");
            } catch (error) {
                console.log(error);
                toast.error(`${error}`);
            }

            //     "User submitted: ",
            //     name,
            //     prenom,
            //     Age,
            //     email,
            //     password,
            //     address,
            //     tel
            // );
        }
    };
    return (
        <div
            style={{
                marginTop: "3rem",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
                action=""
                onSubmit={handleSubmit}
            >
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nom"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Prenom"
                    onChange={(e) => setPrenom(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Age"
                    onChange={(e) => setAge(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Adresse"
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Téléphone"
                    onChange={(e) => setTel(e.target.value)}
                />
                <button> S&#39;inscrire</button>
            </form>
        </div>
    );
};

export default SignUp;
