import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from '../../store/tasks';
import { useParams } from "react-router-dom";


function Contacts() {



    // const { listId } = useParams();

    // const dispatch = useDispatch();

    // const taskIn = useSelector((state) => state.tasks.currentTask);
    // let task;
    // if (taskIn.length) {
    //     task = taskIn[0]
    // }

    // let [id, setId] = useState(task?.id);
    // let [list_id, setListId] = useState(task?.list_id);
    // let [name, setName] = useState(task?.name);
    // let [description, setDescription] = useState(task?.description);
    // let [due_date, setDueDate] = useState(task?.due_date);
    // let [completed, setCompleted] = useState(task?.completed);
    // let [priority, setPriority] = useState(task?.priority);
    // let [isChecked, setIsChecked] = useState(task?.completed);
    // let [originalList, setOriginalList] = useState(null);
    // let [errors, setErrors] = useState([]);

    // useEffect(() => {
    //     setId(task?.id)
    //     setListId(task?.list_id)
    //     setName(task?.name)
    //     setDescription(task?.description)
    //     setDueDate(task?.due_date)
    //     setCompleted(task?.completed)
    //     setPriority(task?.priority)
    //     setIsChecked(task?.completed)
    //     setErrors([]);
    //     handleConfirmation('cancel')
    //     if (originalList === null) {
    //         setOriginalList()
    //     }
    // }, [task?.id, task?.list_id, task?.name, task?.description, task?.due_date, task?.completed, task?.priority, originalList]);

    // // =========

    // useEffect(() => {
    //     dispatch(taskActions.getListTasksThunk(listId));
    // }, [dispatch, listId]);

    // const allLists = useSelector((state) => state.lists.allLists);
    // const arrLists = Object.values(allLists);

    // // =========

    function handleCloseRight() {
        window.showHideContactbar('hide')
    }

    // // =========

    // const handleCompleted = (e) => {
    //     setIsChecked(!isChecked);
    //     setCompleted(!isChecked);
    // };

    // const handleEditTask = async (e) => {
    //     e.preventDefault();
    //     const data = await dispatch(taskActions.editTaskThunk(id, name, list_id, description, due_date, completed, priority));
    //     if (data) {
    //         setErrors(data);
    //         return
    //     }
    //     dispatch(taskActions.getListTasksThunk(listId));
    // };

    // const handleTrashTask = async (e) => {
    //     e.preventDefault();
    //     const data = await dispatch(taskActions.editTaskThunk(id, name, listTrash[0]?.id, description, due_date, completed, priority));
    //     if (data) {
    //         setErrors(data);
    //         return
    //     }
    //     dispatch(taskActions.getListTasksThunk(listId));
    //     window.showHideTaskbar('hide')
    // };

    // const handleDeleteTask = async (e) => {
    //     e.preventDefault();
    //     const data = await dispatch(taskActions.deleteTaskThunk(id));
    //     if (data) {
    //         setErrors(data);
    //         return
    //     }
    //     window.showHideTaskbar('hide')
    // };

    // useSelector((state) => state.tasks.listTasks);

    // function handleConfirmation(action) {
    //     if (action === 'show') {
    //         document.getElementById('initiate-delete').style.display = 'none'
    //         document.getElementById('confirm-delete').style.display = 'block'
    //     } else {
    //         document.getElementById('initiate-delete').style.display = 'block'
    //         document.getElementById('confirm-delete').style.display = 'none'
    //     }
    // }

    // =========

    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ paddingTop: '20px', color: '#0060bf', fontWeight: '600', fontSize: '18px' }}>Contacts</div>
                <button style={{ marginBottom: '20px' }} className="close-popup" onClick={() => { handleCloseRight() }}><i className="fas fa-times" /></button >
            </div >

            CCCCC

        </>
    );
}

export default Contacts;
