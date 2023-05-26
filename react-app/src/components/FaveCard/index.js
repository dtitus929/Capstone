import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import * as faveActions from '../../store/faves';


function FaveCard(props) {


    const dispatch = useDispatch();

    const { id, name, url } = props;
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const [faveName, setFaveName] = useState(name);
    const [faveUrl, setFaveUrl] = useState(url);
    const [errors, setErrors] = useState([]);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
        setFaveName(name);
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

    const handleEditFave = async (e) => {
        e.preventDefault();

        const data = await dispatch(faveActions.editFaveThunk(id, faveName, faveUrl));
        if (data) {
            setErrors(data);
            return
        } else {
            closeMenu();
        }
    };


    const handleDeleteFave = async (e) => {
        e.preventDefault();

        const data = await dispatch(faveActions.deleteFaveThunk(id));
        closeMenu();

        if (data) {
            setErrors(data);
            return
        }
    };

    function handleCloseWindow() {
        window.showHideTaskbar('hide')
    }

    function handleConfirmation(action, id) {
        if (action === 'show') {
            document.getElementById(`initiate-fave-delete-${id}`).style.display = 'none'
            document.getElementById(`confirm-fave-delete-${id}`).style.display = 'block'
        } else {
            document.getElementById(`initiate-fave-delete-${id}`).style.display = 'block'
            document.getElementById(`confirm-fave-delete-${id}`).style.display = 'none'
        }
    }

    return (
        <>
            <a onClick={() => { handleCloseWindow() }} className="list-link" title={name} href={url} target={'_blank'} rel="noopener noreferrer external">{name}</a>

            <div>
                <button onClick={openMenu} id={`editDeleteListButton-${id}`} className="editlist-button"><i className="far fa-edit" /></button>
            </div>

            <ul className={ulClassName} ref={ulRef}>
                <div id={`editDeleteList-${id}`} className="edit-list-popup" style={{ paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{
                            fontWeight: 'bold', color: '#0060bf'
                        }}>Edit Link</div>
                        <button className="close-popup" onClick={closeMenu}><i className="fas fa-times" /></button>
                    </div>

                    <div className="form-div" style={{ margin: '5px 0px 0px 0px' }}>

                        {errors.length > 0 &&
                            <div style={{ paddingBottom: '8px', paddingLeft: '10px', color: 'red', display: 'block', fontSize: '14px' }}>
                                {errors.map((error, idx) => <li key={idx}>{error.substr(7)}</li>)}
                            </div >
                        }

                        <form onSubmit={handleEditFave}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>

                                <input style={{ margin: '0px 0px 0px 0px' }} className="edittask-input-field" type="text" value={faveName} placeholder={faveName} onChange={(e) => setFaveName(e.target.value)} required />
                                <input style={{ margin: '0px 0px 0px 0px' }} className="edittask-input-field" type="text" value={faveUrl} placeholder={faveUrl} onChange={(e) => setFaveUrl(e.target.value)} required />
                                <button style={{ margin: '10px 60px 10px 60px', fontSize: '12px', padding: '4px 8px 4px 4px' }} className="logout-button" type="submit"><i className="far fa-edit" style={{ fontSize: '12px' }} />&nbsp;&nbsp;Change Link</button>

                            </div>
                        </form>

                        <form onSubmit={handleDeleteFave}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                                <div id={`initiate-fave-delete-${id}`} style={{ margin: '0px 75px 0px 75px', textAlign: 'center', cursor: 'pointer', fontSize: '11px', padding: '2px 10px 2px 2px' }} className="deletetask-button-init" type="submit" onClick={() => { handleConfirmation('show', id) }}><i className="far fa-times-circle" style={{ fontSize: '11px' }} />&nbsp;&nbsp;Delete Link</div>

                                <div id={`confirm-fave-delete-${id}`} style={{ display: 'none' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                        <div style={{ fontSize: '12px' }}>Permanently delete this link?</div>
                                        <div style={{ display: 'flex', textAlign: 'center', marginTop: '10px' }}>
                                            <div style={{ margin: '0px 5px 0px 0px', cursor: 'pointer', fontSize: '11px', padding: '3px 10px 2px 10px' }} className="logout-button" onClick={() => { handleConfirmation('cancel', id) }}>NO</div>
                                            <button style={{ margin: '0px 0px 0px 5px', fontSize: '11px', padding: '3px 10px 2px 10px' }} className="deletetask-button" type="submit">YES</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>

                    </div>

                </div>
            </ul>



        </>
    );
}

export default FaveCard;
