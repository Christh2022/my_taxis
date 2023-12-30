import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../Firebase.config";
import { toast } from "react-toastify";
import { useId } from "react";

const UseFonction = () => {
    const driverId = useId();

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
        let date = new Date();
        let day = date.getDate();

        if (day === a.day) {
            return "Auj";
        } else if (day === a.day + 1) {
            return "Hier";
        } else if (day === a.day + 2) {
            return "Avant-hier";
        } else return "delete";
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

            return transactions;
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
    const addRecette = async (date, recette, depense, id, idDriver) => {
        if (date && recette && depense) {
            const documentSnapshot = await getDocs(
                collection(firestore, "utilisateur")
            );

            try {
                // console.log(documentSnapshot);
                if (documentSnapshot) {
                    const tab = [];
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
                            recetteTab.push({date, montant: recette});
                            depenseTab.push({date, montant: depense})
                            newDriver.push({ ...item, recette: recetteTab, depense: depenseTab });
                        }
                    });
                    updateDoc(doc(firestore, "utilisateur", id), {
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
                            chauffeur: newDriver,
                        },
                    })

                    // console.log(newDriver);
                }
            } catch (error) {toast.error("une erreur s'est produite")}
        } else {
            console.log("hello");
        }
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
    };
};

export default UseFonction;
