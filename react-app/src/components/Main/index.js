import React from "react";
import { useState, useEffect } from "react";
import Lists from "../Lists";
import Tasks from "../Tasks";
import logo from './rem-eggs-logo.svg'
import bgimage from './dotted-bg.gif'
import EditTaskCard from "../EditTask";
import Contacts from "../Contacts";

import * as listActions from '../../store/lists'
import * as taskActions from '../../store/tasks'
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Main() {

    const history = useHistory();

    const [selectedTask, setSelectedTask] = useState("");

    const dispatch = useDispatch();

    const { listId } = useParams();

    useEffect(() => {
        dispatch(listActions.getAllListsThunk());
    }, [dispatch, listId]);

    const allLists = useSelector((state) => state.lists.allLists);
    const arrLists = Object.values(allLists);

    let listInbox = [];
    if (arrLists) {
        listInbox = arrLists.filter(function (el) {
            return el.name === "Inbox";
        });
    }

    let listTrash = [];
    if (arrLists) {
        listTrash = arrLists.filter(function (el) {
            return el.name === "Trash";
        });
    }

    const thisList = allLists[listId];

    useEffect(() => {
        if (listId === "home" && listInbox.length) {
            history.push(`/${listInbox[0].id}`);
        }
    }, [listInbox]);

    useEffect(() => {
        if (listId !== 'home') {
            dispatch(taskActions.getListTasksThunk(listId));
        }
    }, [dispatch, listId]);

    const allTasks = useSelector((state) => state.tasks.listTasks);
    const arrTasks = Object.values(allTasks);

    const currentTask = arrTasks.filter(function (el) {
        return el.id === selectedTask;
    });

    useEffect(() => {
        dispatch(taskActions.currentTaskThunk(currentTask));

    }, [dispatch, currentTask]);

    const completedTasks = arrTasks.filter(function (el) {
        return el.completed === true;
    });

    const uncompleteTasks = arrTasks.filter(function (el) {
        return el.completed === false;
    });

    return (

        <div id="layout-main">

            {/* %%%%%%%%%%%%%%%%%%% */}

            <div id="layout-leftnav">
                <div style={{ margin: '0px 20px 16px 10px' }}><img src={`${logo}`} alt='' /></div>
                <div className="lists-leftside">
                    <Lists setSelectedTask={setSelectedTask} />
                </div>
            </div>

            {/* %%%%%%%%%%%%%%%%%%% */}

            <div style={{ width: '10px', display: 'none' }}></div>

            {/* %%%%%%%%%%%%%%%%%%% */}

            <div id="layout-content">

                {/* ========== */}

                <div id="layout-content-tasks-holder">
                    <div id="layout-content-tasks">

                        <Tasks setSelectedTask={setSelectedTask} />

                        {/* Dotted Repeat */}
                        <div style={{ backgroundImage: `url(${bgimage})`, backgroundRepeat: "repeat", backgroundColor: '#ffffff', height: '100%' }}></div>

                    </div>
                </div>

                {/* %%%%%%%%%%%%%%%%%%% */}

                <div id="layout-content-right-taskbar">

                    <EditTaskCard listTrash={listTrash} />

                </div>

                <div id="layout-content-right-contactbar">

                    {/* <EditTaskCard listTrash={listTrash} /> */}
                    <Contacts />

                </div>

                {/* %%%%%%%%%%%%%%%%%%% */}

                <div id="layout-content-right">

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>

                        <div id="list-nums-holder">
                            {thisList && (
                                <div id="list-name" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                    <div style={{ marginRight: '20px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{thisList.name}</div>
                                    <div style={{ marginRight: '20px', fontSize: '14px', color: 'rgb(0, 0, 0, .25)', whiteSpace: 'nowrap' }}>{arrTasks.length} total tasks</div>
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

                        <div id="copyright-area">

                            {/* FOOTER  */}

                            <div>© {new Date().getFullYear()} Remember The Eggs</div>

                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>

                                <div>
                                    <span>Dave Titus:</span>
                                </div>

                                <div className="footer-link">
                                    <span>
                                        <a className="footer-button" href="http://creativegozone.com/" target="_blank" rel="noreferrer">
                                            <button className="copyright-button">
                                                <i className="fas fa-eye" style={{ fontSize: '14px' }}></i>
                                            </button>
                                        </a>
                                    </span>
                                </div>

                                <div className="footer-link">
                                    <span>
                                        <a className="footer-button" href="https://github.com/dtitus929/Capstone" target="_blank" rel="noreferrer">
                                            <button className="copyright-button">
                                                <i className="fa fa-github" style={{ fontSize: '14px' }}></i>
                                            </button>
                                        </a>
                                    </span>
                                </div>

                                <div className="footer-link">
                                    <span>
                                        <a className="footer-button" href="https://www.linkedin.com/in/djtitus/" target="_blank" rel="noreferrer">
                                            <button className="copyright-button">
                                                <i className="fa fa-linkedin-square" style={{ fontSize: '14px' }}></i>
                                            </button>


                                        </a>
                                    </span>
                                </div>

                            </div >

                        </div>

                    </div>

                </div>

                {/* %%%%%%%%%%%%%%%%%%% */}

            </div>


            {/* %%%%%%%%%%%%%%%%%%% */}

        </div >
    );
}

export default Main;
