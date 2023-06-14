import React from "react";

function TaskCard(props) {

    const { arrTasks, setSelectedTask } = props;

    const adjustTime = (date) => {
        const thisDate = new Date(`${date} 00:00:00`);
        const options = { month: 'short', day: 'numeric' };
        if (date) {
            return thisDate.toLocaleDateString("en-US", options);
        } else {
            return '';
        }

    }

    const handleCardClick = (taskId) => {
        setSelectedTask(taskId)
        window.showHideTaskbar('show')
        window.showHideContactbar('hide')
    }

    return (
        <>
            {arrTasks?.map(({ id, name, due_date, priority, completed }) => (
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
                    </div>
                </div>
            ))
            }

        </>
    );
}

export default TaskCard;
