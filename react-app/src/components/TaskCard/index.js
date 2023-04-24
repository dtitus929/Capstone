import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function TaskCard(props) {

    const { arrTasks } = props;

    console.log(arrTasks);


    return (
        <>

            {arrTasks?.map(({ id, name, description, due_date, priority, completed, list_id, user_id, created_at, updated_at }) => (

                <div key={id} className="task-card" onClick={() => { window.showHideTaskbar('show') }}>
                    <div className="taskcard-content">
                        <div className={`priority-${priority}`}></div>
                        <div style={{ width: '100%' }}>{name}</div>
                        <div style={{ whiteSpace: 'nowrap' }}>{due_date}</div>
                        {/* <div>{`${completed}`}</div> */}
                    </div>

                </div>
            ))
            }


        </>
    );
}

export default TaskCard;
