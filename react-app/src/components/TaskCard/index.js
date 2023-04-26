import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";


function TaskCard(props) {

    const { arrTasks, setSelectedTask } = props;


    const adjustTime = (date) => {
        const thisDate = new Date(`${date} 00:00:00`);
        // console.log(thisDate);
        // const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        const options = { month: 'short', day: 'numeric' };
        if (date) {
            return thisDate.toLocaleDateString("en-US", options);
        } else {
            return '';
        }

    }

    // const { listId } = useParams();
    // const history = useHistory();

    const handleCardClick = (taskId) => {
        setSelectedTask(taskId)
        window.showHideTaskbar('show')
    }


    return (
        <>

            {arrTasks?.map(({ id, name, description, due_date, priority, completed, list_id, user_id, created_at, updated_at }) => (

                <div key={id} className="task-card" onClick={() => { handleCardClick(id) }}>
                    <div className="taskcard-content">
                        <div className={`priority-${priority}`} style={{ flexGrow: 1, alignSelf: 'stretch' }}></div>
                        <div style={completed ? { width: '100%', textDecoration: 'line-through', color: '#9c9c9c' } : { width: '100%' }}>{name}</div>

                        {completed ? (
                            <>
                                <div style={{ whiteSpace: 'nowrap', color: '#9b9b9b', margin: '0px 8px 0px 10px', width: '45px', textAlign: 'right', fontSize: '16px' }}><i className="fa fa-check" /></div>
                            </>
                        ) : (
                            <>
                                <div style={{ whiteSpace: 'nowrap', color: '#9b9b9b', margin: '0px 8px 0px 10px', width: '45px' }}>{adjustTime(due_date)}</div>
                            </>
                        )}

                        {/* <div>{`${completed}`}</div> */}
                    </div>

                </div>
            ))
            }


        </>
    );
}

export default TaskCard;
