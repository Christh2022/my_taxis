import { useEffect, useState } from "react";
import UseGetData from "./UseGetData";
import UserAuth from "./UserAuth";

const UseVariables = () => {
    const { data } = UseGetData("utilisateur");
    const { currentUser } = UserAuth();
    const [tab, setTab] = useState([]);
    const [drivertab, setDriverTab] = useState([]);
    const [depense, setDepense] = useState(0);
    const [recette, setRecette] = useState(0);
    const [recetteDay, setRecetteDay] = useState([]);
    const [depenseGreen, setDepenseGreen] = useState(false);
    const [benefice, setBenefice] = useState(0);
    const [benefice_mois, setBenefice_mois] = useState(0);
    const [conducteur, setConducteur] = useState(0);
    const [hide, setHide] = useState(false);

    useEffect(() => {
        const newTab = data?.filter((item) => item.id === currentUser?.uid);
        setTab(newTab);
        if (data && data.length > 0) {
            let newTabDepense = [];
            let newTabRecette = [];

            for (let i = 0; i < tab[0]?.info_entreprise.chauffeur.length; i++) {
                newTabDepense.push(
                    tab[0]?.info_entreprise.chauffeur[i]?.depense
                );
                newTabRecette.push(
                    tab[0]?.info_entreprise.chauffeur[i]?.recette
                );
            }

            let tableau_1 = newTabDepense
                .map((item) => {
                    return { ...item };
                })
                .map((objet) => Object.values(objet))
                .flat();

            let tableau_2 = newTabRecette
                .map((item) => {
                    return { ...item };
                })
                .map((objet) => Object.values(objet))
                .flat();

            setDriverTab(tab[0]?.info_entreprise.chauffeur);

            const recette_mois = tableau_2
            .filter((item) => item.date.month === 12)
            .reduce((acc, val) => acc + val.montant, 0)

            const depense_mois = tableau_1
                .filter((item) => item.date.month === 12)
                .reduce((acc, val) => acc + val.montant, 0);

            setBenefice_mois(recette_mois - depense_mois);
            setRecette(tableau_2.reduce((acc, val) => acc + val.montant, 0));
            setDepense(
                tableau_1.reduce((acc, val) => acc + val.montant, 0) +
                    tab[0]?.info_entreprise.taxis.reduce(
                        (acc, val) => acc + val.price,
                        0
                    )
            );
            
            setRecetteDay(tableau_2);

            if (recette - depense === 0) {
                setDepenseGreen(false);
            }
            if (recette - depense < 0) {
                setBenefice(depense - recette);
                setDepenseGreen(false);
            } else {
                setDepenseGreen(true);
                setBenefice(recette - depense);
            }
            setConducteur(tab[0]?.info_entreprise.chauffeur.length);
        }
    }, [data, currentUser?.uid, depense, recette, benefice]);
    return {
        hide,
        setHide,
        tab,
        depense,
        recette,
        recetteDay,
        depenseGreen,
        benefice,
        conducteur,
        drivertab,
        benefice_mois,
    };
};

export default UseVariables;
