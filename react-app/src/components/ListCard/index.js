import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as listActions from '../../store/lists'


function ListCard(props) {


    const dispatch = useDispatch();
    const history = useHistory();

    const { id, name, type, listId, setSelectedTask } = props;
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const [list_name, setListName] = useState(name);
    const [errors, setErrors] = useState([]);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
        setListName(name);
        setErrors([]);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => {
        setShowMenu(false);
        setErrors([]);
    }

    const handleEditList = async (e) => {
        e.preventDefault();

        const data = await dispatch(listActions.editListThunk(id, list_name));
        if (data) {
            setErrors(data);
            return
        } else {
            closeMenu();
        }
    };


    const handleDeleteList = async (e) => {
        e.preventDefault();

        const data = await dispatch(listActions.deleteListThunk(id));
        closeMenu();
        history.push("/home");

        if (data) {
            setErrors(data);
            return
        }
    };

    function handleCloseWindow() {
        setSelectedTask('')
        window.showHideTaskbar('hide')
    }

    function handleConfirmation(action, id) {
        if (action === 'show') {
            document.getElementById(`initiate-delete-${id}`).style.display = 'none'
            document.getElementById(`confirm-delete-${id}`).style.display = 'block'
        } else {
            document.getElementById(`initiate-delete-${id}`).style.display = 'block'
            document.getElementById(`confirm-delete-${id}`).style.display = 'none'
        }
    }

    return (
        <>

            <Link onClick={() => { handleCloseWindow() }} style={id == listId ? { color: '#0060bf', fontWeight: 'bold' } : { color: '#000000' }} className="list-link" title={name} to={`/${id}`}>
                {name}
            </Link>

            <div style={type === 'standard' ? { display: 'block' } : { display: 'none' }}>
                <div>
                    <button onClick={openMenu} id={`editDeleteListButton-${id}`} className="editlist-button"><i className="far fa-edit" /></button>
                </div>
            </div>

            <ul className={ulClassName} ref={ulRef}>
                <div id={`editDeleteList-${id}`} className="edit-list-popup" style={{ paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{
                            fontWeight: 'bold', color: '#0060bf'
                        }}>Edit List</div>
                        <button className="close-popup" onClick={closeMenu}><i className="fas fa-times" /></button>
                    </div>

                    <div className="form-div" style={{ margin: '5px 0px 0px 0px' }}>

                        {errors.length > 0 &&
                            <div style={{ paddingBottom: '8px', paddingLeft: '10px', color: 'red', display: 'block', fontSize: '14px' }}>
                                {errors.map((error, idx) => <li key={idx}>{error.substr(7)}</li>)}
                            </div >
                        }

                        <form onSubmit={handleEditList}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                                <input style={{ margin: '0px 0px 0px 0px' }} className="edittask-input-field" type="text" value={list_name} placeholder={list_name} onChange={(e) => setListName(e.target.value)} required />
                                <button style={{ margin: '0px 50px 10px 50px', fontSize: '12px', padding: '4px 0px' }} className="logout-button" type="submit">Change Name</button>

                            </div>
                        </form>

                        <form onSubmit={handleDeleteList}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                                <div id={`initiate-delete-${id}`} style={{ margin: '0px 70px 0px 70px', textAlign: 'center', cursor: 'pointer', fontSize: '12px', padding: '4px 0px' }} className="deletetask-button" type="submit" onClick={() => { handleConfirmation('show', id) }}>Delete List</div>

                                <div id={`confirm-delete-${id}`} style={{ display: 'none' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                        <div style={{ fontSize: '12px' }}>Are you sure you want to delete this list?</div>
                                        <div style={{ display: 'flex', textAlign: 'center', marginTop: '10px' }}>
                                            <div style={{ margin: '0px 5px 0px 0px', cursor: 'pointer', fontSize: '11px', padding: '3px 10px 2px 10px' }} className="logout-button" onClick={() => { handleConfirmation('cancel', id) }}>NO</div>
                                            <button style={{ margin: '0px 0px 0px 5px', fontSize: '11px', padding: '3px 10px 2px 10px' }} className="deletetask-button" type="submit">YES</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>

                    </div>

                    {/* {name} / {id} / {listId} */}
                </div>
            </ul>



        </>
    );
}

export default ListCard;
