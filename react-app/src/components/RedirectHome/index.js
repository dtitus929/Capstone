import React from "react";
import { useHistory } from "react-router-dom";

function RedirectHome() {

    const history = useHistory();

    history.push("/home");

    return (

        <>
        </>

    );
}
export default RedirectHome;
