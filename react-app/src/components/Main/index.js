import React from "react";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Lists from "../Lists";
import Tasks from "../Tasks";
import logo from './rem-eggs-logo.svg'
import bgimage from './dotted-bg.gif'

import * as listActions from '../../store/lists'
import * as taskActions from '../../store/tasks'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Main() {


    const dispatch = useDispatch();

    const { listId } = useParams();


    useEffect(() => {
        dispatch(listActions.getAllListsThunk());
    }, [dispatch, listId]);

    const allLists = useSelector((state) => state.lists.allLists);
    const thisList = allLists[listId];

    useEffect(() => {
        dispatch(taskActions.getListTasksThunk(listId));
    }, [dispatch, listId]);

    const allTasks = useSelector((state) => state.tasks.listTasks);
    const arrTasks = Object.values(allTasks);
    console.log(arrTasks);
    const completedTasks = arrTasks.filter(function (el) {
        return el.completed === true;
    });
    // console.log(completedTasks);
    // console.log(completedTasks.length);
    const uncompleteTasks = arrTasks.filter(function (el) {
        return el.completed === false;
    });
    // console.log(uncompleteTasks);
    // console.log(uncompleteTasks.length);



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

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>

                        <div id="list-nums-holder">
                            {thisList && (
                                <div id="list-name">

                                    {thisList.name}
                                    <span style={{ fontSize: '14px', marginLeft: '30px', color: 'rgb(0, 0, 0, .25)' }}>{arrTasks.length} total tasks</span>

                                </div>
                            )}

                            <div id="task-num-holder">

                                {arrTasks && (
                                    <div className="task-num">
                                        <div style={{ fontSize: '19px', fontWeight: '600', color: '#0260bf' }}>{uncompleteTasks.length}</div>
                                        <div style={{ fontSize: '11px' }} >incomplete</div>
                                    </div>

                                )}

                                {arrTasks && (
                                    <div className="task-num">
                                        <div style={{ fontSize: '19px', fontWeight: '600', color: '#838a93' }}>{completedTasks.length}</div>
                                        <div style={{ fontSize: '11px', color: '#838a93' }} >completed</div>
                                    </div>

                                )}

                            </div>

                        </div>

                        <div id="copyright-area">© 2023 Remember The Eggs</div>


                    </div>

                </div>

                {/* %%%%%%%%%%%%%%%%%%% */}

            </div>


            {/* %%%%%%%%%%%%%%%%%%% */}

        </div >


    );
}

export default Main;
