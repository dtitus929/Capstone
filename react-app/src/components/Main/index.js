import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from './rem-eggs-logo.svg'
import bgimage from './dotted-bg.gif'

function Main({ isLoaded }) {

    function showHideTaskbar(action) {
        if (action === 'show') {
            document.getElementById("layout-content-right-taskbar").style.display = "block";
        } else {
            document.getElementById("layout-content-right-taskbar").style.display = "none";
        }
    }


    return (


        <div id="layout-main">

            {/* %%%%%%%%%%%%%%%%%%% */}

            <div id="layout-leftnav">
                <div style={{ margin: '0px 20px 16px 10px' }}><img src={`${logo}`} alt='' /></div>
                <div className="channels-leftside">
                    channels
                </div>
            </div>

            {/* %%%%%%%%%%%%%%%%%%% */}

            <div style={{ width: '10px', display: 'none' }}></div>

            {/* %%%%%%%%%%%%%%%%%%% */}

            <div id="layout-content">


                {/* ========== */}

                <div id="layout-content-tasks-holder">
                    <div id="layout-content-tasks">

                        <div className="task-card" onClick={() => { showHideTaskbar('show') }}>
                            Task Card
                        </div>

                        {/* Dotted Repeat */}
                        <div style={{ backgroundImage: `url(${bgimage})`, backgroundRepeat: "repeat", backgroundColor: '#ffffff', height: '100%' }}></div>

                    </div>
                </div>

                {/* %%%%%%%%%%%%%%%%%%% */}

                <div id="layout-content-right-taskbar">
                    <div>Edit Task</div>
                    <button onClick={() => { showHideTaskbar('hide') }}>X</button>
                </div>


                {/* %%%%%%%%%%%%%%%%%%% */}

                <div id="layout-content-right">
                    right<br /><br />
                    right<br />
                    right<br />
                </div>

                {/* %%%%%%%%%%%%%%%%%%% */}

            </div>


            {/* %%%%%%%%%%%%%%%%%%% */}

        </div>


    );
}

export default Main;
