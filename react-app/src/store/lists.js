const GET_ALL_LISTS = "lists/GET_ALL_LISTS";

const allLists = (lists) => ({
    type: GET_ALL_LISTS,
    payload: lists,

});

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




const initialState = { lists: null };

export default function listReducer(state = initialState, action) {

    switch (action.type) {
        case GET_ALL_LISTS:

            return { allLists: action.payload.lists };


        default:
            return state;
    }
}
