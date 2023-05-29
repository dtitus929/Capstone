import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function RedirectHome() {

    const history = useHistory();

    useEffect(() => {
        history.push("/home");
    }, [history]);


    return (

        <>
        </>

    );
}
export default RedirectHome;
