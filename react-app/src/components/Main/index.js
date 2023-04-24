import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Lists from "../Lists";
import Tasks from "../Tasks";
import logo from './rem-eggs-logo.svg'
import bgimage from './dotted-bg.gif'

function Main({ isLoaded }) {


    return (


        <div id="layout-main">

            {/* %%%%%%%%%%%%%%%%%%% */}

            <div id="layout-leftnav">
                <div style={{ margin: '0px 20px 16px 10px' }}><img src={`${logo}`} alt='' /></div>
                <div className="lists-leftside">
                    <Lists />
                </div>
            </div>

            {/* %%%%%%%%%%%%%%%%%%% */}

            <div style={{ width: '10px', display: 'none' }}></div>

            {/* %%%%%%%%%%%%%%%%%%% */}

            <div id="layout-content">


                {/* ========== */}

                <div id="layout-content-tasks-holder">
                    <div id="layout-content-tasks">

                        <Tasks />

                        {/* Dotted Repeat */}
                        <div style={{ backgroundImage: `url(${bgimage})`, backgroundRepeat: "repeat", backgroundColor: '#ffffff', height: '100%' }}></div>

                    </div>
                </div>

                {/* %%%%%%%%%%%%%%%%%%% */}

                <div id="layout-content-right-taskbar">
                    <div>Edit Task</div>
                    <button onClick={() => { window.showHideTaskbar('hide') }}>X</button>
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
