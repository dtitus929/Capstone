import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../TaskCard";
import { useParams } from "react-router-dom";
import * as taskActions from '../../store/tasks'


function Tasks() {


    const dispatch = useDispatch();

    const { listId } = useParams();

    useEffect(() => {
        dispatch(taskActions.getListTasksThunk(listId));
    }, [dispatch, listId]);

    const allTasks = useSelector((state) => state.tasks.listTasks);

    const arrTasks = Object.values(allTasks);



    return (
        <>

            <TaskCard arrTasks={arrTasks} />

        </>
    );
}

export default Tasks;
