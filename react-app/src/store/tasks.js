const GET_ALL_TASKS_BY_LIST = "tasks/GET_ALL_TASKS_BY_LIST ";
const NO_TASKS_FOUND = "tasks/NO_TASKS_FOUND ";
const ADD_TASK = "tasks/ADD_TASK ";
const CLEAR_TASKS = "tasks/CLEAR_TASK ";
const EDIT_TASK = "tasks/EDIT_TASK ";
const CURRENT_TASK = "tasks/CURRENT_TASK ";
const DELETE_TASK = "tasks/DELETE_TASK ";

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const allTasksByList = (tasks) => ({
    type: GET_ALL_TASKS_BY_LIST,
    payload: tasks,

});

const noTasksFound = () => ({
    type: NO_TASKS_FOUND,
});

const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,

});

const editTask = (task) => ({
    type: EDIT_TASK,
    payload: task,

});

const clearTasks = () => ({
    type: CLEAR_TASKS,
});

const currentTask = (task) => ({
    type: CURRENT_TASK,
    payload: task,
});

export const deleteTask = (id) => {
    return {
        type: DELETE_TASK,
        id
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const clearTasksThunk = () => (dispatch) => {
    dispatch(clearTasks());
};


// =================

export const currentTaskThunk = (task) => (dispatch) => {
    dispatch(currentTask(task));
};

// =================


export const getListTasksThunk = (id) => async (dispatch) => {

    if (id === 'home') {
        return
    }
    const response = await fetch(`/api/lists/${id}/tasks`);

    if (response.ok) {
        const data = await response.json();
        dispatch(allTasksByList(data));
    } else if (response.status === 404) {
        dispatch(noTasksFound());
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};


// =================


export const addTaskThunk = (listId, name, description, due_date, priority) => async (dispatch) => {

    const response = await fetch(`/api/lists/${listId}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            description,
            due_date,
            priority,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addTask(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

// =================


export const editTaskThunk = (taskId, name, list_id, description, due_date, completed, priority) => async (dispatch) => {

    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            list_id,
            description,
            due_date,
            completed,
            priority,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(editTask(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

// =================

export const deleteTaskThunk = (id) => async dispatch => {
    const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        dispatch(deleteTask(id))
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const initialState = { listTasks: {}, currentTask: {} };

export default function taskReducer(state = initialState, action) {

    let newState;

    switch (action.type) {

        case GET_ALL_TASKS_BY_LIST:
            const listTasks = {};
            action.payload.tasks.forEach((task) => (listTasks[task.id] = task));
            return {
                ...state, listTasks: { ...listTasks }
            }

        case NO_TASKS_FOUND:
            return {
                ...state, listTasks: {}
            }

        case ADD_TASK:
            newState = { ...state }
            newState.listTasks = { ...state.listTasks };
            newState.listTasks[action.payload.id] = action.payload;
            return newState;


        case EDIT_TASK:
            newState = { ...state }
            newState.listTasks = { ...state.listTasks };
            newState.listTasks[action.payload.id] = action.payload;
            return newState;


        case DELETE_TASK:
            newState = { ...state }
            newState.listTasks = { ...state.listTasks };
            delete newState.listTasks[action.id];
            return newState;


        case CURRENT_TASK:
            return { ...state, currentTask: action.payload }


        case CLEAR_TASKS:
            return {
                ...state, listTasks: {}
            }

        default:
            return state;
    }
}
