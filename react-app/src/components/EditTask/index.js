import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from '../../store/tasks';
import { useParams } from "react-router-dom";


function EditTaskCard(props) {

    const { id } = props;

    const dispatch = useDispatch();

    const { listId } = useParams();

    useEffect(() => {
        dispatch(taskActions.getListTasksThunk(listId));
    }, [dispatch, listId]);

    const allLists = useSelector((state) => state.lists.allLists);
    const arrLists = Object.values(allLists);

    console.log(id);
    console.log("arrLists:", arrLists);



    let thisTask = [];
    if (arrLists && id) {
        thisTask = arrLists.filter(function (el) {
            return el.id === id;
        });
    }
    console.log("ThisTask:", thisTask);

    if (thisTask.length) {
        console.log("hello?");
        console.log('Inbox:', thisTask)
        console.log('InboxId:', thisTask[0].id)
    }




    return (
        <>

            <div>Edit Task</div>
            <div>{id}</div>
            <button onClick={() => { window.showHideTaskbar('hide') }}>X</button>


        </>
    );
}

export default EditTaskCard;
