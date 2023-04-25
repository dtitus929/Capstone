import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from '../../store/tasks';
import { useParams } from "react-router-dom";


function EditTaskCard(props) {

    let { id } = props;

    const dispatch = useDispatch();

    const { listId } = useParams();

    // =========


    useEffect(() => {
        dispatch(taskActions.getListTasksThunk(listId));
    }, [dispatch, listId]);

    const allLists = useSelector((state) => state.lists.allLists);
    const arrLists = Object.values(allLists);

    console.log('EditCompID:', id);
    console.log("arrLists:", arrLists);

    // =========

    useEffect(() => {
        if (listId !== 'home') {
            dispatch(taskActions.getListTasksThunk(listId));
        }
    }, [dispatch, listId]);

    const allTasks = useSelector((state) => state.tasks.listTasks);
    const arrTasks = Object.values(allTasks);

    // console.log('arrTasks', arrTasks);
    // console.log('id', id);

    let thisTask = [];
    if (arrTasks && id) {
        thisTask = arrTasks.filter(function (el) {
            return el.id === id;
        });
    }
    console.log("ThisTask:", thisTask);

    if (thisTask.length) {
        // console.log("hello?");
        // console.log('Inbox:', thisTask)
        // console.log('InboxId:', thisTask[0].id)
    }

    function handleCloseRight() {
        id = ''
        window.showHideTaskbar('hide')
        console.log('THEID', id)
    }

    // =========


    return (
        <>

            <div>Edit Task</div>
            <div>{id}</div>
            {id && (
                <>
                    <div>{thisTask[0].id}</div>
                    <div>{thisTask[0].name}</div>
                    <div>{thisTask[0].description}</div>
                    <div>{thisTask[0].due_date}</div>
                    <div>{thisTask[0].priority}</div>
                    <div>{thisTask[0].completed}</div>
                    <div>{thisTask[0].list_id}</div>
                </>
            )}

            <button onClick={() => { handleCloseRight() }}>X</button>


        </>
    );
}

export default EditTaskCard;
