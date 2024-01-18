import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../Firebase.config";
import { toast } from "react-toastify";
import UseVariables from "./UseVariables";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const UseFonction = () => {
    const driverId = v4();
    const { carTab, drivertab } = UseVariables();

    //ecrire le nombre sous forme de 1.000.000
    const formatterNombre = (n) => {
        if (n > 999) {
            //convertir le nombre en chaine dde caractères
            const str = String(n);

            //créer un tableau vide
            const parts = [];

            for (let i = str.length; i > 0; i -= 3) {
                //prendre des groupes de 3 chiffres à partir de la droite
                parts.unshift(str.substring(Math.max(0, i - 3), i));
            }
            return parts.join("."); //joindre les parties avec un point
        } else return n;
    };

    //envoyer la date actuelle
    const handleDay = () => {
        let date = new Date();
        let day = date.getDate();
        let month = 1 + date.getMonth();
        let year = date.getFullYear();

        const object = {
            day,
            month,
            year,
        };

        return object;
    };

    //comparer la date de la recette et la date d'aujourd'hui
    const handleDateRecette = (objetDate) => {
        // Obtenez la date actuelle
        let dateActuelle = new Date();
        // Réglez l'heure actuelle à minuit
        dateActuelle.setHours(0, 0, 0, 0);

        // Créez un objet date à partir des données fournies
        let dateObjet = new Date(
            objetDate.year,
            objetDate.month - 1,
            objetDate.day
        );
        // Réglez l'heure de l'objet date à minuit
        dateObjet.setHours(0, 0, 0, 0);

        // Vérifiez les conditions
        if (dateObjet.getTime() === dateActuelle.getTime()) {
            return "auj";
        } else if (dateObjet.getTime() === dateActuelle.getTime() - 86400000) {
            // 86400000 millisecondes correspondent à un jour
            return "hier";
        } else if (
            dateObjet.getTime() ===
            dateActuelle.getTime() - 86400000 * 2
        ) {
            return "Avant-hier";
        } else {
            return "delete";
        }
    };

    //Gérer les pourcentages des bénéfices du mois
    const handleBenefPercent = () => {
        let percent = 0;
        let benefit = [];

        const date = new Date();
        // Mois en JavaScript est indexé de 0 à 11, donc  il faut ajouter 1 au mois
        // Crée un nouvel objet Date avec l'année et le mois spécifiés et le jour 0 pour obtenir le dernier jour du mois
        // En utilisant getDate(), récupère le nombre de jours dans le mois
        const DayNbrperMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();

        carTab?.forEach((item) => {
            let a =
                item.recette
                    ?.filter((item) => item.date.month === date.getMonth() + 1)
                    ?.reduce((acc, val) => acc + val.montant, 0) -
                item.motifDepense
                    ?.filter((item) => item.date.month === date.getMonth() + 1)
                    ?.reduce((acc, val) => acc + Number(val.price), 0);

            if (item.type?.toLowerCase() === "coaster")
                benefit.push(a / (50000 * DayNbrperMonth));
            if (item.type?.toLowerCase() === "bus")
                benefit.push(a / (35000 * DayNbrperMonth));
            if (item.type?.toLowerCase() === "taxis")
                benefit.push(a / (15000 * DayNbrperMonth));
        });

        percent = benefit.reduce((acc, val) => acc + val, 0).toFixed(3);

        return percent;
    };

    //Gérer les pourcentages des bénéfices du mois
    const handleBenefPercentEmployee = (id) => {
        const anneeEnCours = new Date().getFullYear();
        // La date du 1er janvier de l'année suivante moins un jour
        const dateFinAnnee = new Date(anneeEnCours + 1, 0, 0);
        // La date du 1er janvier de l'année actuelle
        var dateDebutAnnee = new Date(anneeEnCours, 0, 1);

        // Calcul de la différence en millisecondes
        var difference = dateFinAnnee - dateDebutAnnee;

        // Conversion de la différence en jours
        var nombreDeJours = difference / (1000 * 60 * 60 * 24);

        const driver = drivertab.find((item) => item.id === id);
        if (driver) {
            let percent = 0;
            let benefit = [];

            benefit.push(
                (driver.recette.reduce((acc, val) => acc + val.montant, 0) -
                    driver.depense.reduce((acc, val) => acc + val.montant, 0)) /
                    (15000 * nombreDeJours + 1)
            );

            percent = benefit.reduce((acc, val) => acc + val, 0).toFixed(2);

            return percent;
        }
    };

    //vous avez fourni et renvoie un tableau contenant les sommes des montants pour chaque date.
    const regrouperParDate = (tableau) => {
        let montantsParDate = {};

        tableau.forEach((objet) => {
            let dateKey = `${objet.date.year}-${objet.date.month}-${objet.date.day}`;

            if (!montantsParDate[dateKey]) {
                montantsParDate[dateKey] = {
                    montantTotal: objet.montant,
                    date: objet.date,
                };
            } else {
                montantsParDate[dateKey].montantTotal += objet.montant;
            }
        });

        return Object.values(montantsParDate);
    };

    //Créer un tableau comportons les informations de la recette et des dépense
    const createTableRecettesDepenses = (drivertab, id) => {
        if (drivertab) {
            const transactions = [];

            drivertab
                ?.filter((item) => item.id === id)[0]
                ?.recette.forEach((recette) => {
                    const macthingDepense = drivertab
                        ?.filter((item) => item.id === id)[0]
                        .depense.find(
                            (depense) => depense.date.day === recette.date.day
                        );
                    if (macthingDepense) {
                        transactions.push({
                            date: recette.date,
                            montantRecette: recette.montant,
                            montantDepense: macthingDepense.montant,
                        });
                    }
                });

            // Tri des données par date (du plus récent au plus ancien)
            const sortedData = transactions.sort((a, b) => {
                const dateA = new Date(
                    a.date.year,
                    a.date.month - 1,
                    a.date.day
                );
                const dateB = new Date(
                    b.date.year,
                    b.date.month - 1,
                    b.date.day
                );
                return dateB - dateA;
            });

            const date = new Date();
            const month = date.getMonth();

            return sortedData.filter((item) => {
                const dateA = new Date(
                    item.date.year,
                    item.date.month - 1,
                    item.date.day
                );

                return dateA.getMonth() === month;
            });
        }
    };

    //enregistrée un nouvel employé
    const addEmployee = async (
        nom,
        prenom,
        age,
        tel,
        adresse,
        nombre_d_enfant,
        statut_marital,
        date_de_prise_de_post,
        statut,
        id,
        image
    ) => {
        if (
            nom &&
            prenom &&
            age &&
            tel &&
            adresse &&
            nombre_d_enfant &&
            statut_marital &&
            date_de_prise_de_post &&
            image
        ) {
            const newEmploye = {
                id: driverId,
                nom,
                prenom,
                adresse,
                age,
                tel,
                nombre_d_enfant,
                statut_marital,
                date_de_prise_de_post,
                statut: "inactif",
                depense: [],
                recette: [],
                photoUrl: image,
            };

            const documentSnapshot = await getDocs(
                collection(firestore, "utilisateur")
            );

            try {
                if (documentSnapshot) {
                    const list = [];
                    documentSnapshot.forEach((doc) => {
                        list.push({ ...doc.data() });
                    });
                    const data = list.filter((item) => item.id === id);

                    const newDriver = [];
                    data[0].info_entreprise.chauffeur.forEach((item) => {
                        newDriver.push(item);
                    });

                    if (
                        data[0].info_entreprise.chauffeur.length ===
                        newDriver.length
                    ) {
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

                                        const imageRef = ref(
                                            storage,
                                            `files/${v4()} `
                                        );
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
                                                    "Upload is " +
                                                        progress +
                                                        "% done"
                                                );
                                                switch (snapshot.state) {
                                                    case "paused":
                                                        console.log(
                                                            "Upload is paused"
                                                        );
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
                                                ).then((downloadURL) => {
                                                    console.log(downloadURL);
                                                    newDriver.push({
                                                        ...newEmploye,
                                                        photoUrl: downloadURL,
                                                    });
                                                    updateDoc(
                                                        doc(
                                                            firestore,
                                                            "utilisateur",
                                                            id
                                                        ),
                                                        {
                                                            info_entreprise: {
                                                                taxis: data[0]
                                                                    .info_entreprise
                                                                    .taxis,
                                                                chauffeur:
                                                                    newDriver,
                                                            },
                                                        }
                                                    );
                                                    toast.success(
                                                        "le chauffeur a été ajouté avec success"
                                                    );
                                                    console.log(newDriver);
                                                });
                                            }
                                        );
                                    });
                                },
                                "image/webp",
                                0.1
                            );
                        };
                    }
                } else {
                    toast.error("Le document spécifié n'existe pas.");
                }
            } catch (e) {
                toast.error("une erreur s'est produite.");
            }
        } else {
            const newEmploye = {
                id: driverId,
                nom,
                prenom,
                adresse,
                age,
                tel,
                nombre_d_enfant,
                statut_marital,
                date_de_prise_de_post,
                statut,
                depense: [],
                recette: [],
                photoUrl: image,
            };
            console.log(newEmploye);
            toast.error("veuillez remplir tous les champs");
            console.log("error");
        }
    };

    //ajouter une date pour ajouter les recettes du chauffeur
    const addRecette = async (
        date,
        recette,
        depense,
        motif,
        id,
        idDriver,
        id_car
    ) => {
        if (date && recette && depense >= 0) {
            const documentSnapshot = await getDocs(
                collection(firestore, "utilisateur")
            );

            try {
                if (documentSnapshot) {
                    const tab = [];
                    const newDepense = [];
                    const newRecette = [];
                    const newCarTab = [];
                    documentSnapshot.forEach((doc) => {
                        tab.push({ ...doc.data() });
                    });
                    const data = tab.filter((item) => item.id === id);
                    const recetteTab = [];
                    const depenseTab = [];
                    const driver = [];
                    data[0].info_entreprise.chauffeur.forEach((item) => {
                        if (item.id === idDriver) driver.push(item);
                    });

                    driver[0].recette?.forEach((recette) => {
                        recetteTab.push(recette);
                    });

                    driver[0].depense?.forEach((depense) => {
                        depenseTab.push(depense);
                    });

                    const newDriver = [];
                    data[0].info_entreprise.chauffeur.forEach((item) => {
                        if (item.id !== idDriver) newDriver.push(item);
                        else {
                            recetteTab.push({ date, montant: recette });
                            depenseTab.push({ date, montant: depense });
                            newDriver.push({
                                ...item,
                                recette: recetteTab,
                                depense: depenseTab,
                            });
                        }
                    });

                    carTab
                        ?.filter((item) => item.numeroSerie === id_car)[0]
                        ?.motifDepense?.forEach((item) => {
                            newDepense.push(item);
                        });

                    carTab
                        ?.filter((item) => item.numeroSerie === id_car)[0]
                        ?.recette?.forEach((item) => {
                            newRecette.push(item);
                        });

                    carTab.forEach((item) => {
                        if (item.numeroSerie === id_car) {
                            newDepense.push({ date, price: depense, motif });
                            newRecette.push({
                                date,
                                montant: recette,
                                driverName: ` ${driver[0].nom} ${driver[0].prenom}`,
                                driverId: id,
                            });
                            newCarTab.push({
                                ...item,
                                motifDepense: [...newDepense],
                                recette: [...newRecette],
                            });
                        } else {
                            newCarTab.push(item);
                        }
                    });

                    updateDoc(doc(firestore, "utilisateur", id), {
                        info_entreprise: {
                            taxis: newCarTab,
                            chauffeur: newDriver,
                        },
                    });
                }
            } catch (error) {
                toast.error("une erreur s'est produite");
            }
        } else {
            console.log("hello");
        }
    };

    //creer un tableau de lien
    const linkTab = async (tab) => {
        if (tab) {
            const carDoc = [];

            for (const image of tab) {
                const url = URL.createObjectURL(image);
                const img = new Image();

                await new Promise((resolve) => {
                    img.onload = function () {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");
                        canvas.width = img.naturalWidth;
                        canvas.height = img.naturalHeight;

                        ctx.drawImage(img, 0, 0);

                        canvas.toBlob(
                            async (blob) => {
                                const filereader = new FileReader();

                                filereader.readAsDataURL(blob);

                                filereader.addEventListener(
                                    "load",
                                    async () => {
                                        const dataUrl = filereader.result;
                                        const img2 = new Image();
                                        img2.src = dataUrl;

                                        const imageRef = ref(
                                            storage,
                                            `files/${v4()} `
                                        );
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
                                                    "Upload is " +
                                                        progress +
                                                        "% done"
                                                );
                                                switch (snapshot.state) {
                                                    case "paused":
                                                        console.log(
                                                            "Upload is paused"
                                                        );
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
                                                resolve();
                                            },
                                            async () => {
                                                const downloadURL =
                                                    await getDownloadURL(
                                                        uploadTask.snapshot.ref
                                                    );
                                                    const obj = {
                                                        url : downloadURL,
                                                        date: new Date()
                                                    }
                                                carDoc.push({...obj});
                                                resolve();
                                            }
                                        );
                                    }
                                );
                            },
                            "image/webp",
                            0.1
                        );
                    };

                    img.src = url;
                });
            }

            console.log(carDoc);
            return carDoc;
        } else {
            console.log("erreur");
            return [];
        }
    };

    //ajouter une nouvelle voiture
    const AddNewCar = async (
        marque,
        modele,
        type,
        madeYear,
        places,
        numeroSerie,
        carburant,
        kilometrage,
        n_matricule,
        date_inspection,
        achat_date,
        prix_achat,
        assurance_date,
        chauffeur,
        statut,
        id,
        images,
        CarImages
    ) => {
        const documentSnapshot = await getDocs(
            collection(firestore, "utilisateur")
        );

        if (documentSnapshot) {
            const tab = [];
            const newCar = [];

            documentSnapshot.forEach((item) => {
                tab.push({ ...item.data() });
            });

            carTab.forEach((item) => {
                newCar.push(item);
            });

            newCar.push({
                marque,
                modele,
                type,
                madeYear,
                places,
                numeroSerie,
                carburant,
                kilometrage,
                n_matricule,
                date_inspection,
                achat_date,
                price: Number(prix_achat),
                assurance_date,
                chauffeur,
                statut,
                motifDepense: [],
                recette: [],
                Car_Document: await linkTab(images),
                Car_Images: await linkTab(CarImages),
            });

            const newTab = [];
            if (
                newCar.filter((item) => item.chauffeur === chauffeur)[0]
                    ?.chauffeur === chauffeur &&
                drivertab.filter((val) => val.id === chauffeur)[0]?.statut ===
                    "inactif"
            ) {
                drivertab?.forEach((value) => {
                    if (value.id === chauffeur) {
                        newTab.push({ ...value, statut: "actif" });
                    } else {
                        newTab.push({ ...value });
                    }
                });
                console.log("good");
                console.log(newTab, newCar);
            } else {
                drivertab?.forEach((value) => {
                    newTab.push({ ...value });
                });
            }
            updateDoc(doc(firestore, "utilisateur", id), {
                info_entreprise: {
                    taxis: newCar,
                    chauffeur: newTab,
                },
            });
        }
    };

    //ajouter une dépense
    const handleNewDepense = async (date, price, motif, id, id_car) => {
        const documentSnapshot = await getDocs(
            collection(firestore, "utilisateur")
        );
        if (documentSnapshot && date && price && motif) {
            const tab = [];
            const newDepense = [];
            const newCarTab = [];

            documentSnapshot.forEach((item) => {
                tab.push({ ...item.data() });
            });

            const data = tab.filter((item) => item.id === id);

            carTab
                ?.filter((item) => item.numeroSerie === id_car)[0]
                ?.motifDepense?.forEach((item) => {
                    newDepense.push(item);
                });

            const datTab = date.replace(/-/g, " ").split(" ").reverse();
            const newData = {
                day: Number(datTab[0]),
                month: Number(datTab[1]),
                year: Number(datTab[2]),
            };
            // console.log(newData);
            carTab.forEach((item) => {
                if (item.numeroSerie === id_car) {
                    newDepense.push({ date: newData, price, motif });
                    newCarTab.push({ ...item, motifDepense: [...newDepense] });
                } else {
                    newCarTab.push(item);
                }
            });

            updateDoc(doc(firestore, "utilisateur", id), {
                info_entreprise: {
                    taxis: newCarTab,
                    chauffeur: data[0].info_entreprise.chauffeur,
                },
            });
        }
    };

    //supprimer un chauffeur
    const handleDeleteDriver = async (id, idDriver, nom) => {
        if (window.confirm("voulez-vous supprimer cet employé")) {
            const newDriverTab = [];
            const neWCarTab = [];

            drivertab.forEach((item) => {
                if (item.id !== idDriver) {
                    newDriverTab.push({ ...item });
                }
            });

            if (
                newDriverTab.filter((item) => item.id === idDriver)?.length >= 1
            ) {
                toast.error("une erreur s'est produit");
            } else {
                carTab.forEach((item) => {
                    if (
                        newDriverTab.filter((val) => val.id === item.chauffeur)
                            ?.length >= 1
                    ) {
                        neWCarTab.push(item);
                    } else {
                        neWCarTab.push({
                            ...item,
                            chauffeur: "aucun chauffeur disponible",
                        });
                    }
                });
                await updateDoc(doc(firestore, "utilisateur", id), {
                    info_entreprise: {
                        chauffeur: newDriverTab,
                        taxis: neWCarTab,
                    },
                });
                toast.success(
                    `vous venez de supprimer le chauffeur ${nom} donc une voiture n'a plus de conducteur`
                );
            }
        }
    };

    //attribuer un chauffeur à une voiture
    const driverAddTaxi = async (idDriver, idCar, id) => {
        const newCarTab = [];
        const newDriverTab = [];
        const driverNewTab = [];

        carTab.forEach((val) => {
            if (val.numeroSerie !== idCar) {
                newCarTab.push({ ...val });
            } else {
                newCarTab.push({ ...val, chauffeur: idDriver });
                if (idDriver !== "aucun chauffeur disponible") {
                    drivertab?.forEach((value) => {
                        if (value.id !== idDriver) {
                            newDriverTab.push({ ...value });
                        } else {
                            newDriverTab.push({ ...value, statut: "actif" });
                        }
                    });

                    toast.success("le véhicule est attribué à un chauffeur");
                } else {
                    drivertab?.forEach((value) => {
                        driverNewTab.push({ ...value });
                    });
                    toast.warning("aucun n'a été associé à ce véhicule");
                }
            }
        });

        newDriverTab?.forEach((item) => {
            if (newCarTab?.find((value) => value.chauffeur === item.id)) {
                driverNewTab.push({ ...item });
            } else driverNewTab.push({ ...item, statut: "inactif" });
        });

        await updateDoc(doc(firestore, "utilisateur", id), {
            info_entreprise: {
                taxis: newCarTab,
                chauffeur: driverNewTab,
            },
        });
    };

    //changer le statut d'un véhicule
    const changeStatut = async (idCar, statut, id) => {
        const newCarTab = [];

        carTab.forEach((item) => {
            if (item.numeroSerie === idCar) {
                newCarTab.push({ ...item, statut });
            } else {
                newCarTab.push({ ...item });
            }
        });

        await updateDoc(doc(firestore, "utilisateur", id), {
            info_entreprise: {
                taxis: newCarTab,
                chauffeur: drivertab,
            },
        });
    };
    //changer la date de fin d'assurance
    const changeAssuranceDate = async (idCar, date, id) => {
        const newCarTab = [];

        carTab.forEach((item) => {
            if (item.numeroSerie === idCar) {
                newCarTab.push({ ...item, assurance_date: date });
            } else {
                newCarTab.push({ ...item });
            }
        });

        await updateDoc(doc(firestore, "utilisateur", id), {
            info_entreprise: {
                taxis: newCarTab,
                chauffeur: drivertab,
            },
        });
    };

    //salaire de l'employé
    const busOrCoasterOrTaxiEmployee = (total_jour, id) => {
        const driver = carTab.find((item) => item.chauffeur === id);
        let chauffeur = 0;
        let controleur = 0;

        if (driver.type === "bus" || driver.type === "coaster") {
            if (driver.type === "bus") {
                const salaire = 10000;
                chauffeur = formatterNombre(total_jour * (salaire * 0.6));
                controleur = formatterNombre(total_jour * (salaire * 0.4));
            } else if (driver.type === "coaster") {
                const salaire = 15000;
                chauffeur = formatterNombre(total_jour * (salaire * 0.6));
                controleur = formatterNombre(total_jour * (salaire * 0.4));
            }
        } else if (driver.type === "taxis") {
            const salaire = 4000;
            chauffeur = formatterNombre(total_jour * salaire);
        }

        return { chauffeur, controleur };
    };

    return {
        formatterNombre,
        handleDay,
        handleDateRecette,
        handleBenefPercent,
        regrouperParDate,
        createTableRecettesDepenses,
        addEmployee,
        addRecette,
        AddNewCar,
        handleNewDepense,
        handleDeleteDriver,
        driverAddTaxi,
        changeStatut,
        changeAssuranceDate,
        busOrCoasterOrTaxiEmployee,
        handleBenefPercentEmployee,
        linkTab 
    };
};

export default UseFonction;
