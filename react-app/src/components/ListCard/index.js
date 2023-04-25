import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as listActions from '../../store/lists'


function ListCard(props) {


    const dispatch = useDispatch();
    // const history = useHistory();

    const { id, name, type, listId } = props;
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const [list_name, setListName] = useState(name);
    const [errors, setErrors] = useState([]);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
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
    const closeMenu = () => setShowMenu(false);

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

        if (data) {
            setErrors(data);
            return
        }
    };

    return (
        <>

            <Link onClick={() => { window.showHideTaskbar('hide') }} style={id == listId ? { color: '#0060bf', fontWeight: 'bold' } : { color: '#000000' }} className="list-link" title={name} to={`/${id}`}>
                {name}
            </Link>

            <div style={type === 'standard' ? { display: 'block' } : { display: 'none' }}>
                <div>
                    <button onClick={openMenu} id={`editDeleteListButton-${id}`} className="editlist-button"><i className="far fa-edit" /></button>
                </div>
            </div>

            <ul className={ulClassName} ref={ulRef}>
                <div id={`editDeleteList-${id}`} className="edit-list-popup">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{
                            fontWeight: 'bold', color: '#0060bf'
                        }}>Edit/Delete List</div>
                        <button className="close-popup" onClick={closeMenu}><i className="fas fa-times" /></button>
                    </div>

                    <div className="form-div">

                        {errors.length > 0 &&
                            <div style={{ paddingTop: '20px', paddingLeft: '20px', color: 'red', display: 'block' }}>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </div >
                        }

                        <form onSubmit={handleEditList}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                                <input className="popup-input-field" type="text" value={list_name} placeholder={list_name} onChange={(e) => setListName(e.target.value)} required />
                                <button className="popup-input-submit" type="submit">Change Name</button>

                            </div>
                        </form>

                        <form onSubmit={handleDeleteList}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                                <button className="popup-input-submit" type="submit">Delete List</button>

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
