import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from '../../store/tasks';
import { useParams } from "react-router-dom";


function EditTaskCard() {

    const { listId } = useParams();

    const dispatch = useDispatch();

    const taskIn = useSelector((state) => state.tasks.currentTask);
    let task;
    if (taskIn.length) {
        task = taskIn[0]
    }

    let [id, setId] = useState('task?.id');
    let [list_id, setListId] = useState(task?.list_id);
    let [name, setName] = useState(task?.name);
    let [description, setDescription] = useState(task?.description);
    let [due_date, setDueDate] = useState(task?.due_date);
    let [completed, setCompleted] = useState(task?.completed);
    let [priority, setPriority] = useState(task?.priority);
    let [isChecked, setIsChecked] = useState(task?.completed);
    let [errors, setErrors] = useState([]);


    useEffect(() => {
        setId(task?.id)
        setListId(task?.list_id)
        setName(task?.name)
        setDescription(task?.description)
        setDueDate(task?.due_date)
        setCompleted(task?.completed)
        setPriority(task?.priority)
        setIsChecked(task?.completed)
        setErrors([]);
        handleConfirmation('cancel')
    }, [task?.id, task?.list_id, task?.name, task?.description, task?.due_date, task?.completed, task?.priority]);



    // =========


    useEffect(() => {
        dispatch(taskActions.getListTasksThunk(listId));
    }, [dispatch, listId]);

    const allLists = useSelector((state) => state.lists.allLists);
    const arrLists = Object.values(allLists);

    // =========

    function handleCloseRight() {

        window.showHideTaskbar('hide')

    }

    // =========

    const handleCompleted = (e) => {
        setIsChecked(!isChecked);
        setCompleted(!isChecked);
    };


    const handleEditTask = async (e) => {
        e.preventDefault();

        const data = await dispatch(taskActions.editTaskThunk(id, name, list_id, description, due_date, completed, priority));
        if (data) {
            setErrors(data);
            return
        }

        dispatch(taskActions.getListTasksThunk(listId));

    };

    const handleDeleteTask = async (e) => {
        e.preventDefault();

        const data = await dispatch(taskActions.deleteTaskThunk(id));


        if (data) {
            setErrors(data);
            return
        }

        window.showHideTaskbar('hide')
    };

    useSelector((state) => state.tasks.listTasks);

    function handleConfirmation(action) {
        if (action === 'show') {
            document.getElementById('initiate-delete').style.display = 'none'
            document.getElementById('confirm-delete').style.display = 'block'
        } else {
            document.getElementById('initiate-delete').style.display = 'block'
            document.getElementById('confirm-delete').style.display = 'none'
        }
    }


    // =========


    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ paddingTop: '20px', color: '#0060bf', fontWeight: '600', fontSize: '18px' }}>Edit Task</div>
                <button style={{ marginBottom: '20px' }} className="close-popup" onClick={() => { handleCloseRight() }}><i className="fas fa-times" /></button >
            </div >

            <div className="taskform-shell">
                <div className="taskform-holder">


                    <form onSubmit={handleEditTask} style={{ padding: '0px 20px' }} >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>

                            {errors.length > 0 &&
                                <div style={{ paddingTop: '0px', paddingLeft: '10px', paddingBottom: '10px', color: 'red', display: 'block', fontSize: '14px' }}>
                                    {errors.map((error, idx) => <li key={idx}>{error.substr(7)}</li>)}
                                </div >
                            }

                            <div style={{ fontSize: '14px' }}>Name:</div>

                            <input className="edittask-input-field" type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                            <div style={{ height: '1px', backgroundColor: '#cccccc', margin: '10px 0px 5px 0px' }}></div>

                            <div style={{ fontSize: '14px' }}>Notes:</div>
                            <textarea style={{ resize: 'none', height: '70px' }} className="edittask-input-field" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

                            <div style={{ height: '1px', backgroundColor: '#cccccc', margin: '10px 0px 10px 0px' }}></div>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ fontSize: '14px' }}>Due Date:&nbsp;</div>
                                <input className="edittask-input-field" type="date" value={due_date} onChange={(e) => setDueDate(e.target.value)} />
                            </div>

                            <div style={{ height: '1px', backgroundColor: '#cccccc', margin: '10px 0px 10px 0px' }}></div>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ fontSize: '14px' }}>List:&nbsp;</div>
                                <select className="edittask-input-field" value={list_id} onChange={(e) => setListId(e.target.value)}>
                                    {arrLists?.map(({ id, name }) => (

                                        <option key={id} value={id}>{name}</option>

                                    ))
                                    }
                                </select>
                            </div>

                            <div style={{ height: '1px', backgroundColor: '#cccccc', margin: '10px 0px 10px 0px' }}></div>


                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                <div style={{ marginRight: '7px', fontSize: '14px' }}>Priority: </div>

                                <div style={{ marginRight: '4px', color: '#ff0000', fontSize: '14px' }}>high</div>
                                <input
                                    checked={priority === 1}
                                    type='radio'
                                    label="High"
                                    value={1}
                                    onChange={() => { setPriority(1) }}
                                />
                                <span style={{ color: '#828282', fontWeight: 'lighter', margin: '0px 5px' }}>|</span>
                                <div style={{ marginRight: '4px', color: '#d8b208', fontSize: '14px' }}>med</div>
                                <input
                                    checked={priority === 2}
                                    type='radio'
                                    label="Medium"
                                    value={2}
                                    onChange={() => { setPriority(2) }}
                                />
                                <span style={{ color: '#828282', fontWeight: 'lighter', margin: '0px 5px' }}>|</span>
                                <div style={{ marginRight: '4px', color: '#9b9b9b', fontSize: '14px' }}>low</div>
                                <input
                                    checked={priority === 3}
                                    type='radio'
                                    label="Low"
                                    value={3}
                                    onChange={() => { setPriority(3) }}
                                />
                            </div>

                            <div style={{ height: '1px', backgroundColor: '#cccccc', margin: '10px 0px 10px 0px' }}></div>

                            <div style={{ display: 'flex' }}>
                                <div style={{ marginRight: '7px', fontSize: '14px' }}>Completed: </div>
                                <input className="edittask-input-field" type="checkbox" checked={isChecked} onChange={(e) => handleCompleted(e.target.value)} />
                            </div>

                            <div style={{ height: '1px', backgroundColor: '#cccccc', margin: '10px 0px 10px 0px' }}></div>

                            <button style={{ margin: '10px 80px 20px 80px' }} className="logout-button" type="submit">Change Task</button>

                        </div>
                    </form >

                    <form onSubmit={handleDeleteTask} style={{ padding: '0px 20px' }} >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                            <div id="initiate-delete" style={{ margin: '0px 120px 0px 120px', textAlign: 'center', cursor: 'pointer' }} className="deletetask-button" onClick={() => { handleConfirmation('show') }}>Delete Task</div>

                            <div id="confirm-delete" style={{ display: 'none' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                    <div>Are you sure you want to delete this task?</div>
                                    <div style={{ display: 'flex', textAlign: 'center', marginTop: '10px' }}>
                                        <div style={{ margin: '0px 5px 0px 0px', cursor: 'pointer' }} className="logout-button" onClick={() => { handleConfirmation('cancel') }}>NO</div>
                                        <button style={{ margin: '0px 0px 0px 5px', padding: '0px 20px' }} className="deletetask-button" type="submit">YES</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </form >

                </div>
            </div>

        </>
    );
}

export default EditTaskCard;
