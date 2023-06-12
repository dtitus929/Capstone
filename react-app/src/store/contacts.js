const GET_ALL_CONTACTS = "contacts/GET_ALL_CONTACTS";
const EDIT_CONTACT = "contacts/EDIT_CONTACT";
const DELETE_CONTACT = "contacts/DELETE_CONTACT"
const ADD_CONTACT = "contacts/ADD_CONTACT"
const CLEAR_CONTACTS = "contacts/CLEAR_CONTACTS"

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const allContacts = (contacts) => ({
    type: GET_ALL_CONTACTS,
    payload: contacts,
});

const editContact = (contact) => ({
    type: EDIT_CONTACT,
    payload: contact,
});

export const deleteContact = (id) => {
    return {
        type: DELETE_CONTACT,
        id
    }
}

export const addContact = (payload) => {
    return {
        type: ADD_CONTACT,
        payload
    }
}

export const clearContacts = () => {
    return {
        type: CLEAR_CONTACTS,
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const clearContactsThunk = () => (dispatch) => {
    dispatch(clearContacts());
};

// =================

export const getAllContactsThunk = () => async (dispatch) => {
    const response = await fetch("/api/contacts/");

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(allContacts(data));
    }
};

// =================

export const editContactThunk = (id, name, address, city, state, zip, phone, url) => async (dispatch) => {
    const response = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, address, city, state, zip, phone, url }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(editContact(data));
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

export const deleteContactThunk = (id) => async dispatch => {
    const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        dispatch(deleteContact(id))
    }
}

// =================

export const addContactThunk = (name, address, city, state, zip, phone, url) => async dispatch => {
    const response = await fetch('/api/contacts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            address,
            city,
            state,
            zip,
            phone,
            url
        }),
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addContact(data))
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

const initialState = { allContacts: {} };

export default function contactReducer(state = initialState, action) {

    let newState;

    switch (action.type) {

        case GET_ALL_CONTACTS:
            const allContacts = {};
            action.payload.contacts.forEach((contact) => (allContacts[contact.id] = contact));
            return {
                ...state, allContacts: { ...allContacts }
            }

        case EDIT_CONTACT:
            newState = { ...state }
            newState.allContacts = { ...state.allContacts };
            newState.allContacts[action.payload.id] = action.payload;
            return newState;

        case DELETE_CONTACT:
            newState = { ...state }
            newState.allContacts = { ...state.allContacts };
            delete newState.allContacts[action.id];
            return newState;

        case ADD_CONTACT:
            newState = { ...state }
            newState.allContacts = { ...state.allContacts };
            newState.allContacts[action.payload.id] = action.payload;
            return newState;

        case CLEAR_CONTACTS:
            return {
                ...state, allContacts: {}
            }

        default:
            return state;

    }

}
