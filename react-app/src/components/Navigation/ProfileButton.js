import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { clearListsThunk } from '../../store/lists'
import { clearTasksThunk } from '../../store/tasks'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import chickenHead from './chicken-head.png'
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(clearListsThunk())
    dispatch(clearTasksThunk())
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} className="profile-button">
        <span style={{ fontSize: '11px', paddingRight: '5px' }}>&#9660;</span><i className="fa fa-cog" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="profile-popup" style={{ padding: '12px 0px 2px 0px', margin: '0px' }}>

              <div style={{ display: 'flex', alignContent: 'space-between', alignItems: 'flex-start', marginLeft: '40px' }}>
                <div style={{ textAlign: 'center' }}><img src={`${chickenHead}`} alt="Smack" style={{ width: '100px ' }} /></div>
                <button className="close-popup" onClick={closeMenu}><i className="fas fa-times" /></button>
              </div>
              <div><b>{user.first_name} {user.last_name}</b></div>
              <div>{user.username}</div>
              <div>{user.email}</div>
              <div style={{ textAlign: 'center' }}><button onClick={handleLogout} className="logout-button">Log Out</button></div>

            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
