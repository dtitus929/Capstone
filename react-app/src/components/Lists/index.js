import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as listActions from '../../store/lists';
import * as faveActions from '../../store/faves';
import ListCard from "../ListCard";
import FaveCard from "../FaveCard";
import { useParams, useHistory } from "react-router-dom";

function Lists(props) {

  let { setSelectedTask } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const [showNewList, setShowNewList] = useState(false);
  const [showNewFave, setShowNewFave] = useState(false);
  const newList = useRef();
  const newFave = useRef();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState([]);

  const openNewList = () => {
    if (showNewList) return;
    setName('');
    setUrl('');
    setErrors([]);
    setShowNewList(true);
  };

  const openNewFave = () => {
    if (showNewFave) return;
    setName('');
    setUrl('');
    setErrors([]);
    setShowNewFave(true);
  };

  // ---------

  useEffect(() => {
    if (!showNewList) return;
    const closeNewList = (e) => {
      if (!newList.current.contains(e.target)) {
        setShowNewList(false);
      }
    };
    document.addEventListener("click", closeNewList);
    return () => document.removeEventListener("click", closeNewList);
  }, [showNewList]);

  useEffect(() => {
    if (!showNewFave) return;
    const closeNewFave = (e) => {
      if (!newFave.current.contains(e.target)) {
        setShowNewFave(false);
      }
    };
    document.addEventListener("click", closeNewFave);
    return () => document.removeEventListener("click", closeNewFave);
  }, [showNewFave]);

  const classNewList = "profile-dropdown" + (showNewList ? "" : " hidden");
  const classNewFave = "profile-dropdown-alt" + (showNewFave ? "" : " hidden");
  const closeNewList = () => setShowNewList(false);
  const closeNewFave = () => setShowNewFave(false);

  // ---------

  const addList = async (e) => {
    e.preventDefault();
    const data = await dispatch(listActions.addChannelThunk(name, 'standard'));
    if (!data.id) {
      setErrors(data);
      return
    } else {
      closeNewList();
      setSelectedTask('')
      window.showHideTaskbar('hide')
      history.push(`/${data.id}`);
    }
  };

  const { listId } = useParams();

  useEffect(() => {
    dispatch(listActions.getAllListsThunk());
    dispatch(faveActions.getAllFavesThunk());
  }, [dispatch]);

  const allLists = useSelector((state) => state.lists.allLists);
  const arrLists = Object.values(allLists);

  const addFave = async (e) => {
    e.preventDefault();
    const data = await dispatch(faveActions.addFaveThunk(name, url));
    if (!data.id) {
      setErrors(data);
      return
    } else {
      closeNewFave();
    }
  };

  const allFaves = useSelector((state) => state.faves.allFaves);
  const arrFaves = Object.values(allFaves);

  const handleContactClick = () => {
    if (!window.showingContacts) {
      window.showHideContactbar('show')
    } else {
      window.showHideContactbar('hide')
    }

  }

  return (
    <>

      {arrLists?.map(({ id, name, type }) => (
        <div key={id} style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          {type === 'inbox' && (
            <>
              <ListCard setSelectedTask={setSelectedTask} id={id} name={name} type={type} listId={listId} />
            </>
          )}
        </div >
      ))
      }

      {arrLists?.map(({ id, name, type }) => (
        <div key={id} style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          {type === 'trash' && (
            <>
              <ListCard setSelectedTask={setSelectedTask} id={id} name={name} type={type} listId={listId} />
            </>
          )}
        </div >
      ))
      }

      {/* %%%%%%%%% LISTS %%%%%%%%% */}

      <div style={{ fontSize: '14px', margin: '16px 0px 0px 5px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #bcd0eb', paddingTop: '10px' }}>

        <div><span style={{ fontSize: '6px', padding: '0px 3px 2px 0px' }}>&#9660;</span>Lists</div>
        <div><button onClick={openNewList} className="editlist-button" style={{ marginRight: '6px' }}><i className="far fa-plus-square" /></button></div>

        <ul className={classNewList} ref={newList}>
          <div className="add-list-popup">

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{
                fontWeight: 'bold', color: '#0060bf'
              }}>Add New List</div>
              <button className="close-popup" onClick={closeNewList}><i className="fas fa-times" /></button>
            </div>

            <div className="form-div" style={{ margin: '5px 0px 0px 0px' }}>

              {errors.length > 0 &&
                <div style={{ paddingBottom: '8px', paddingLeft: '10px', color: 'red', display: 'block', fontSize: '14px' }}>
                  {errors.map((error, idx) => <li key={idx}>{error.substr(7)}</li>)}
                </div >
              }

              <form onSubmit={addList}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input style={{ margin: '0px 0px 0px 0px' }} className="edittask-input-field" type="text" value={name} placeholder="List Name" onChange={(e) => setName(e.target.value)} required />
                  <button style={{ margin: '0px 70px 5px 70px', fontSize: '12px', padding: '4px 10px 4px 3px' }} className="logout-button" type="submit"><i className="far fa-plus-square" style={{ fontSize: '12px' }} />&nbsp; &nbsp;Add List</button>
                </div>
              </form>

            </div>

          </div>
        </ul>

      </div>

      {/* %%%%%%%%% LISTS MAP %%%%%%%%% */}

      {arrLists?.map(({ id, name, type }) => (
        <div key={id} style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          {type === 'standard' && (
            <>
              <ListCard setSelectedTask={setSelectedTask} id={id} name={name} type={type} listId={listId} />
            </>
          )}
        </div >
      ))
      }

      {/* %%%%%%%% FAVORITE LINKS %%%%%%%%%% */}

      <div style={{ fontSize: '14px', margin: '16px 0px 0px 5px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #bcd0eb', paddingTop: '10px' }}>

        <div><span style={{ fontSize: '6px', padding: '0px 3px 2px 0px' }}>&#9660;</span>Favorite Links</div>
        <div><button onClick={openNewFave} className="editlist-button" style={{ marginRight: '6px' }}><i className="far fa-plus-square" /></button></div>

        <ul className={classNewFave} ref={newFave}>
          <div className="add-list-popup">

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{
                fontWeight: 'bold', color: '#0060bf'
              }}>Add New Favorite Link</div>
              <button className="close-popup" onClick={closeNewFave}><i className="fas fa-times" /></button>
            </div>

            <div className="form-div" style={{ margin: '5px 0px 0px 0px' }}>

              {errors.length > 0 &&
                <div style={{ paddingBottom: '8px', paddingLeft: '10px', color: 'red', display: 'block', fontSize: '14px' }}>
                  {errors.map((error, idx) => <li key={idx}>{error.substr(6)}</li>)}
                </div >
              }

              <form onSubmit={addFave}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>

                  <input style={{ margin: '0px 0px 0px 0px' }} className="edittask-input-field" type="text" value={name} placeholder="Link Name" onChange={(e) => setName(e.target.value)} required />
                  <input style={{ margin: '0px 0px 0px 0px' }} className="edittask-input-field" type="text" value={url} placeholder="URL Address" onChange={(e) => setUrl(e.target.value)} required />
                  <button style={{ margin: '10px 70px 5px 70px', fontSize: '12px', padding: '4px 10px 4px 3px' }} className="logout-button" type="submit"><i className="far fa-plus-square" style={{ fontSize: '12px' }} />&nbsp; &nbsp;Add Link</button>

                </div>
              </form>

            </div>

          </div>
        </ul>

      </div>

      {/* %%%%%%%%% FAVORITE LINKS MAP %%%%%%%%% */}

      {arrFaves?.map(({ id, name, url }) => (
        <div key={id} style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <FaveCard id={id} name={name} url={url} />
        </div >
      ))
      }

      {/* %%%%%%%% CONTACTS LINK %%%%%%%%%% */}

      <div style={{ fontSize: '14px', margin: '16px 0px 0px 5px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #bcd0eb', paddingTop: '10px' }}>
        <div onClick={handleContactClick} className="list-link" style={{ margin: '0px 5px 0px 0px', padding: '2px 7px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}><span><span style={{ paddingRight: '4px' }}><i className="far fa-address-card" /></span>Contacts</span><span><i style={{ fontSize: '10px' }} className="fas fa-chevron-right" /></span></div>
      </div>

    </>
  );
}

export default Lists;
