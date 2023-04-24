const GET_ALL_LISTS = "lists/GET_ALL_LISTS";
const EDIT_LIST = "lists/EDIT_LIST";
const DELETE_LIST = "lists/DELETE_LIST"
const ADD_LIST = "lists/ADD_LIST"

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const allLists = (lists) => ({
    type: GET_ALL_LISTS,
    payload: lists,

});

const editList = (list) => ({
    type: EDIT_LIST,
    payload: list,

});

export const deleteList = (id) => {
    return {
        type: DELETE_LIST,
        id
    }
}

export const addList = (payload) => {
    return {
        type: ADD_LIST,
        payload
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const getAllListsThunk = () => async (dispatch) => {
    const response = await fetch("/api/lists/");

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(allLists(data));
    }
};

// =================

export const editListThunk = (id, name) => async (dispatch) => {
    console.log('MyID:', id);
    console.log('MyName:', name);
    const response = await fetch(`/api/lists/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name }),
    });

    console.log('RESPONSE:', response)

    if (response.ok) {
        const data = await response.json();
        dispatch(editList(data));
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

export const deleteListThunk = (id) => async dispatch => {
    const response = await fetch(`/api/lists/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        dispatch(deleteList(id))
    }
}

// =================

export const addChannelThunk = (name, type) => async dispatch => {
    const response = await fetch('/api/lists/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            type,
        }),
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addList(data))
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const initialState = { allLists: {} };

export default function listReducer(state = initialState, action) {

    let newState;

    switch (action.type) {

        case GET_ALL_LISTS:
            const allLists = {};
            action.payload.lists.forEach((list) => (allLists[list.id] = list));
            return {
                ...state, allLists: { ...allLists }
            }

        case EDIT_LIST:
            newState = { ...state }
            newState.allLists = { ...state.allLists };
            newState.allLists[action.payload.id] = action.payload;
            return newState;


        case DELETE_LIST:
            newState = { ...state }
            newState.allLists = { ...state.allLists };
            delete newState.allLists[action.id];
            return newState;


        case ADD_LIST:
            console.log('IN ADD_LIST');
            console.log('ThePayload is:', action.payload);
            newState = { ...state }
            newState.allLists = { ...state.allLists };
            newState.allLists[action.payload.id] = action.payload;
            return newState;

        default:
            return state;
    }
}
