import { useState } from "react";

const UseVariables = () => {
    const [hide, setHide] = useState(false);
    return { hide, setHide };
};

export default UseVariables;
