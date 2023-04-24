import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../TaskCard";
import { useParams } from "react-router-dom";
import * as taskActions from '../../store/tasks'



function Tasks() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [due_date, setDueDate] = useState('');
    const [priority, setPriority] = useState(3);

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const { listId } = useParams();

    useEffect(() => {
        dispatch(taskActions.getListTasksThunk(listId));
    }, [dispatch, listId]);

    // -----------

    const handlePriorityChange = (level) => {
        setPriority(level);
    };

    const addTask = async (e) => {
        e.preventDefault();
        setErrors([]);

        const data = await dispatch(taskActions.addTaskThunk(listId, name, description, due_date, priority));

        if (data) {
            setErrors(data);
            return
        }
        setName('');
        setDescription('');
        setDueDate('');
        setPriority(3);
    };

    // -----------


    useEffect(() => {
        if (name) {
            document.getElementById('expanded-task-form').style.display = 'block';
        } else {
            document.getElementById('expanded-task-form').style.display = 'none';
        }
    }, [name]);

    const allTasks = useSelector((state) => state.tasks.listTasks);

    const arrTasks = Object.values(allTasks);



    return (
        <>

            <div>

                {errors.length > 0 &&
                    <div style={{ paddingTop: '20px', paddingLeft: '20px', color: 'red', display: 'block' }}>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </div >
                }

                <form onSubmit={addTask}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', padding: '10px 20px 20px 20px' }}>

                        <input id="task-name" autocomplete="off" className="task-input-field" type="text" value={name} placeholder="Add New Task" onChange={(e) => setName(e.target.value)} required />

                        <div id="expanded-task-form" className="task-formbottom">

                            <div className="task-forms-submit">




                                <div style={{ display: 'flex', flexDirection: 'row', gap: '1px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>

                                    <div style={{ flexGrow: 1, marginRight: '20px' }}>
                                        <textarea autocomplete="off" className="task-textarea-field" type="text" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginRight: '20px', color: '#838383' }}>
                                        <div>
                                            <span style={{ marginRight: '7px', fontSize: '12px' }} > Due Date:</span>
                                            <input style={{ color: '#838383' }} className="task-input-field" type="date" value={due_date} onChange={(e) => setDueDate(e.target.value)} />
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>

                                            <div style={{ marginRight: '7px', fontSize: '12px' }}>Priority: </div>

                                            <div style={{ marginRight: '4px', color: '#ff0000', fontSize: '12px' }}>high</div>
                                            <input
                                                checked={priority === 1}
                                                type='radio'
                                                label="High"
                                                onChange={() => { handlePriorityChange(1) }}
                                            />
                                            <span style={{ color: '#828282', fontWeight: 'lighter', margin: '0px 5px' }}>|</span>
                                            <div style={{ marginRight: '4px', color: '#d8b208', fontSize: '12px' }}>med</div>
                                            <input
                                                checked={priority === 2}
                                                type='radio'
                                                label="Medium"
                                                // value={2}
                                                onChange={() => { handlePriorityChange(2) }}
                                            />
                                            <span style={{ color: '#828282', fontWeight: 'lighter', margin: '0px 5px' }}>|</span>
                                            <div style={{ marginRight: '4px', color: '#9b9b9b', fontSize: '12px' }}>low</div>
                                            <input
                                                checked={priority === 3}
                                                type='radio'
                                                label="Low"
                                                // value={2}
                                                onChange={() => { handlePriorityChange(3) }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button className="task-input-submit" type="submit">Add Task</button>
                                    </div>
                                </div>





                            </div>

                        </div>

                    </div>
                </form >
            </div >

            <TaskCard arrTasks={arrTasks} />

        </>
    );
}

export default Tasks;
