import { useEffect, useState } from "react"
import UseIcons from "./useIcons";



const UseTable = () => {
    const { Dashboard, Courses, Client, Taxis, Driver, Setting } = UseIcons();
    const [table, setTable] = useState([])

    useEffect(()=>{
        const newTab = [
            {
                id: 1,
                name: "Tableau de bord",
                Icon: Dashboard,
                Path: '/home'
            },
            {
                id: 2,
                name: "Courses",
                Icon: Courses,
                Path: '/courses'
            },
            {
                id: 3,
                name: "Clients",
                Icon: Client,
                Path: '/clients'
            },
            {
                id: 4,
                name: "Taxis",
                Icon: Taxis,
                Path: '/taxis'
            },
            {
                id: 5,
                name: "Chauffeurs",
                Icon: Driver,
                Path: '/chauffeur'
            },
            {
                id: 6,
                name: "Parametres",
                Icon: Setting,
                Path: '/parametres'
            }
        ]

        setTable(newTab)
    }, [Dashboard, Courses, Client, Taxis, Driver, Setting])
    return {table};
};

export default UseTable;
