const GET_ALL_FAVES = "faves/GET_ALL_FAVES";
const EDIT_FAVE = "faves/EDIT_FAVE";
const DELETE_FAVE = "faves/DELETE_FAVE"
const ADD_FAVE = "faves/ADD_FAVE"
const CLEAR_FAVES = "faves/CLEAR_FAVES"

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const allFaves = (faves) => ({
    type: GET_ALL_FAVES,
    payload: faves,

});

const editFave = (fave) => ({
    type: EDIT_FAVE,
    payload: fave,

});

export const deleteFave = (id) => {
    return {
        type: DELETE_FAVE,
        id
    }
}

export const addFave = (payload) => {
    return {
        type: ADD_FAVE,
        payload
    }
}

export const clearFaves = () => {
    return {
        type: CLEAR_FAVES,
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const clearFavesThunk = () => (dispatch) => {
    dispatch(clearFaves());
};

// =================


export const getAllFavesThunk = () => async (dispatch) => {
    const response = await fetch("/api/faves/");

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(allFaves(data));
    }
};

// =================

export const editFaveThunk = (id, name, url) => async (dispatch) => {
    // console.log('MyID:', id);
    // console.log('MyName:', name);
    const response = await fetch(`/api/faves/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, url }),
    });

    console.log('RESPONSE:', response)

    if (response.ok) {
        const data = await response.json();
        dispatch(editFave(data));
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

export const deleteFaveThunk = (id) => async dispatch => {
    const response = await fetch(`/api/faves/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        dispatch(deleteFave(id))
    }
}

// =================

export const addFaveThunk = (name, url) => async dispatch => {
    const response = await fetch('/api/faves/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            url,
        }),
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addFave(data))
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

const initialState = { allFaves: {} };

export default function faveReducer(state = initialState, action) {

    let newState;

    switch (action.type) {

        case GET_ALL_FAVES:
            const allFaves = {};
            action.payload.faves.forEach((fave) => (allFaves[fave.id] = fave));
            return {
                ...state, allFaves: { ...allFaves }
            }

        case EDIT_FAVE:
            newState = { ...state }
            newState.allFaves = { ...state.allFaves };
            newState.allFaves[action.payload.id] = action.payload;
            return newState;


        case DELETE_FAVE:
            newState = { ...state }
            newState.allFaves = { ...state.allFaves };
            delete newState.allFaves[action.id];
            return newState;


        case ADD_FAVE:
            // console.log('IN ADD_FAVE');
            // console.log('ThePayload is:', action.payload);
            newState = { ...state }
            newState.allFaves = { ...state.allFaves };
            newState.allFaves[action.payload.id] = action.payload;
            return newState;

        case CLEAR_FAVES:
            return {
                ...state, allFaves: {}
            }

        default:
            return state;
    }
}
