import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth, firestore, storage } from "../Firebase.config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

const SignUp = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [prenom, setPrenom] = useState();
    const [Age, setAge] = useState();
    const [address, setAddress] = useState();
    const [tel, setTel] = useState();
    const [image, setImage] = useState();

    // Function to handle the submit event of the form.
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !email ||
            !password ||
            !name ||
            !prenom ||
            !Age ||
            !address ||
            !tel ||
            !image
        ) {
            toast.error("veuillez remplir tous les champs");
            console.log(
                email,
                password,
                name,
                prenom,
                Age,
                address,
                tel,
                image
            );
        } else {
            try {
                const credential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = credential.user;

                const url = URL.createObjectURL(image);
                const img = new Image();
                img.src = url;

                img.onload = function () {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;

                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob(
                        (blob) => {
                            const filereader = new FileReader();

                            filereader.readAsDataURL(blob);

                            filereader.addEventListener("load", () => {
                                const dataUrl = filereader.result;
                                const img2 = new Image();
                                img2.src = dataUrl;

                                const imageRef = ref(storage, `files/${v4()} `);
                                const uploadTask = uploadBytesResumable(
                                    imageRef,
                                    blob
                                );
                                uploadTask.on(
                                    "state_changed",
                                    (snapshot) => {
                                        const progress =
                                            (snapshot.bytesTransferred /
                                                snapshot.totalBytes) *
                                            100;
                                        console.log(
                                            "Upload is " + progress + "% done"
                                        );
                                        switch (snapshot.state) {
                                            case "paused":
                                                console.log("Upload is paused");
                                                break;
                                            case "running":
                                                console.log(
                                                    "Upload is running"
                                                );
                                                break;
                                            default:
                                        }
                                    },
                                    (error) => {
                                        toast.error(
                                            "une erreur s'est produite"
                                        );
                                        console.log(error);
                                    },
                                    () => {
                                        getDownloadURL(
                                            uploadTask.snapshot.ref
                                        ).then(async (downloadURL) => {
                                            console.log(downloadURL);
                                            //insertion des données dans le firestore
                                            await setDoc(
                                                doc(
                                                    firestore,
                                                    "utilisateur",
                                                    user.uid
                                                ),
                                                {
                                                    id: user.uid,
                                                    nom: name,
                                                    prenom,
                                                    email,
                                                    tel,
                                                    Age,
                                                    address,
                                                    info_entreprise: {
                                                        taxis: [],
                                                        chauffeur: [],
                                                    },
                                                    timestamp:
                                                        serverTimestamp(),
                                                    photoUrl: downloadURL,
                                                }
                                            );
                                        });
                                    }
                                );
                            });
                        },
                        "image/webp",
                        0.1
                    );
                };
                toast.success("Vos données sont bien enregistrées .");
            } catch (error) {
                console.log(error);
                toast.error(`${error}`);
            }
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
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button> S&#39;inscrire</button>
            </form>
        </div>
    );
};

export default SignUp;
