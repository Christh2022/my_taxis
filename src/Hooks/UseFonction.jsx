import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../Firebase.config";
import { toast } from "react-toastify";
import UseVariables from "./UseVariables";
import { v4 } from "uuid";

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
    const handleDateRecette = (a) => {
        const today = new Date();
        const date = new Date(a.year, a.month - 1, a.day);
        const diffInDays =
            (today.getTime() - date.getTime()) / (1000 * 3600 * 24);

        if (
            (diffInDays < 1 &&
                today.getDate() === date.getDate() &&
                today.getMonth() === date.getMonth()) ||
            (diffInDays < 1 &&
                today.getDate() === 1 &&
                today.getMonth() === 0 &&
                date.getDate() === 31 &&
                date.getMonth() === 11)
        ) {
            return "Auj";
        } else if (
            (diffInDays < 1 &&
                today.getDate() - date.getDate() === 1 &&
                today.getMonth() === date.getMonth()) ||
            (diffInDays < 2 &&
                today.getDate() === 1 &&
                today.getMonth() === 0 &&
                date.getDate() === 31 &&
                date.getMonth() === 11)
        ) {
            return "Hier";
        } else if (
            (diffInDays < 2 &&
                today.getDate() - date.getDate() === 2 &&
                today.getMonth() === date.getMonth()) ||
            (diffInDays < 3 &&
                today.getDate() === 1 &&
                today.getMonth() === 0 &&
                date.getDate() === 30 &&
                date.getMonth() === 11)
        ) {
            return "Avant-hier";
        } else {
            return "delete";
        }
    };

    //Gérer les pourcentages des bénéfices du mois
    const handleBenefPercent = (a) => {
        let percent = 0;

        const date = new Date();
        // Mois en JavaScript est indexé de 0 à 11, donc vous devrez ajouter 1 au mois
        // Crée un nouvel objet Date avec l'année et le mois spécifiés et le jour 0 pour obtenir le dernier jour du mois
        // En utilisant getDate(), récupère le nombre de jours dans le mois
        const DayNbrperMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();
        percent = (a / (15000 * DayNbrperMonth)).toFixed(2);

        return percent;
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

            return sortedData;
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
        id
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
            statut
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
                statut,
                depense: [],
                recette: [],
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
                        newDriver.push(newEmploye);

                        updateDoc(doc(firestore, "utilisateur", id), {
                            info_entreprise: {
                                taxis: data[0].info_entreprise.taxis,
                                chauffeur: newDriver,
                            },
                        });

                        toast.success("le chauffeur a été ajouté avec success");
                    }
                } else {
                    toast.error("Le document spécifié n'existe pas.");
                }
            } catch (e) {
                toast.error("une erreur s'est produite.");
            }
        } else {
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

                    carTab.forEach((item) => {
                        if (item.numeroSerie === id_car) {
                            newDepense.push({ date, price: depense, motif });
                            newCarTab.push({
                                ...item,
                                motifDepense: [...newDepense],
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
        id
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
        const newDriverTab = [];
        const neWCarTab = [];

        drivertab.forEach((item) => {
            if (item.id !== idDriver) {
                newDriverTab.push({ ...item });
            }
        });

        if (newDriverTab.filter((item) => item.id === idDriver)?.length >= 1) {
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
    const changeStatut = async(idCar, statut, id)=> {
        const newCarTab = [];

        carTab.forEach((item) => {
            if(item.numeroSerie === idCar){
                newCarTab.push({...item, statut})
            } else {
                newCarTab.push({...item})
            }
        })

        await updateDoc(doc(firestore, "utilisateur", id), {
            info_entreprise: {
                taxis: newCarTab,
                chauffeur: drivertab,
            },
        });
    }
    //changer la date de fin d'assurance
    const changeAssuranceDate = async(idCar, date, id)=> {
        const newCarTab = [];

        carTab.forEach((item) => {
            if(item.numeroSerie === idCar){
                newCarTab.push({...item, assurance_date: date})
            } else {
                newCarTab.push({...item})
            }
        })

        await updateDoc(doc(firestore, "utilisateur", id), {
            info_entreprise: {
                taxis: newCarTab,
                chauffeur: drivertab,
            },
        });
    }

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
        changeAssuranceDate
    };
};

export default UseFonction;
