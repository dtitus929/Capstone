import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function TaskCard() {


    return (
        <>


            <div className="task-card" onClick={() => { window.showHideTaskbar('show') }}>
                Task Card
            </div>



        </>
    );
}

export default TaskCard;
