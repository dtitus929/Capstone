import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function TaskCard(props) {

    const { arrTasks } = props;

    // console.log(arrTasks);

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


    return (
        <>

            {arrTasks?.map(({ id, name, description, due_date, priority, completed, list_id, user_id, created_at, updated_at }) => (

                <div key={id} className="task-card" onClick={() => { window.showHideTaskbar('show') }}>
                    <div className="taskcard-content">
                        <div className={`priority-${priority}`}></div>
                        <div style={{ width: '100%' }}>{name}</div>
                        <div style={{ whiteSpace: 'nowrap', color: '#9b9b9b', marginRight: '10px' }}>{adjustTime(due_date)}</div>
                        {/* <div>{`${completed}`}</div> */}
                    </div>

                </div>
            ))
            }


        </>
    );
}

export default TaskCard;
