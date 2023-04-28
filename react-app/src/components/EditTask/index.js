import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from '../../store/tasks';
import { useParams } from "react-router-dom";


function EditTaskCard(props) {

    const { listTrash } = props;
    // console.log('trash:', listTrash)
    // console.log('trashID:', listTrash[0]?.id)

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
    let [originalList, setOriginalList] = useState(null);
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
        if (originalList === null) {
            setOriginalList()
        }
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

    const handleTrashTask = async (e) => {
        e.preventDefault();

        const data = await dispatch(taskActions.editTaskThunk(id, name, listTrash[0]?.id, description, due_date, completed, priority));
        if (data) {
            setErrors(data);
            return
        }

        dispatch(taskActions.getListTasksThunk(listId));
        window.showHideTaskbar('hide')

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

                                        <option key={id} value={id} style={{ display: name !== 'Trash' ? 'block' : 'none' }} >{name}</option>

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

                            <button style={{ margin: '10px 100px 20px 100px', padding: '5px 20px 5px 10px' }} className="logout-button" type="submit"><i className="far fa-edit" style={{ fontSize: '13px' }} />&nbsp;&nbsp;Change Task</button>

                        </div>
                    </form >


                    <form onSubmit={listId && Number(listId) === Number(listTrash[0]?.id) ? handleDeleteTask : handleTrashTask} style={{ padding: '0px 20px' }} >
                        {/* Delete Me {listId} : {listTrash[0]?.id} */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                            {listId && Number(listId) === Number(listTrash[0]?.id) ? (
                                <div id="initiate-delete" style={{ margin: '0px 115px 0px 115px', textAlign: 'center', cursor: 'pointer', padding: '5px 15px 5px 10px' }} className="deletetask-button-init" onClick={() => { handleConfirmation('show') }}><i className="far fa-times-circle" style={{ fontSize: '13px' }} />&nbsp;&nbsp;Delete Task</div>
                            ) : (
                                <button id="initiate-delete" style={{ margin: '0px 110px 0px 110px', textAlign: 'center', cursor: 'pointer', padding: '5px 15px 5px 10px' }} className="trash-button" type="submit"><i className="far fa-trash-alt" style={{ fontSize: '13px' }} />&nbsp; &nbsp; Move to Trash</button>
                            )
                            }




                            <div id="confirm-delete" style={{ display: 'none' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                    <div>Permanently delete this task?</div>
                                    <div style={{ display: 'flex', textAlign: 'center', marginTop: '10px' }}>
                                        <div style={{ margin: '0px 5px 0px 0px', cursor: 'pointer', fontSize: '13px', padding: '4px 13px' }} className="logout-button" onClick={() => { handleConfirmation('cancel') }}>NO</div>
                                        <button style={{ margin: '0px 0px 0px 5px', fontSize: '13px', padding: '0px 14px' }} className="deletetask-button" type="submit">YES</button>
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
