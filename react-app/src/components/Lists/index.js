import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as listActions from '../../store/lists'
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";


function Lists() {

  const [curOpen, setCurOpen] = useState('');

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(listActions.getAllListsThunk());
  }, [dispatch]);

  const allLists = useSelector((state) => state.lists.allLists);

  const arrLists = allLists;

  const handleListEdit = (id, action) => {
    showListEdit(id, action)
    setCurOpen(`editeDeleteList-${id}`)
  }

  const showListEdit = (id, action) => {
    if (action === 'show') {
      document.getElementById(`editeDeleteList-${id}`).style.display = 'block'
      if (curOpen) {
        document.getElementById(`${curOpen}`).style.display = 'none'
      }
    } else {
      document.getElementById(`editeDeleteList-${id}`).style.display = 'none'
    }

  }

  return (
    <>


      {arrLists?.map(({ id, name, type }) => (


        <div key={id} style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>


          <Link title={name} to={`/${id}`}>
            {name}{curOpen}
          </Link>


          <div style={type === 'standard' ? { display: 'block' } : { display: 'none' }}>
            <div>
              <button onClick={() => { handleListEdit(id, 'show') }} className="standard-button">ED</button>
            </div>
          </div>

          <div id={`editeDeleteList-${id}`} style={{ backgroundColor: '#ffffff', position: 'absolute', display: 'none', zIndex: '30', transform: 'translateX(200px)' }}>
            Edit/Delete<button onClick={() => { handleListEdit(id, 'hide') }} className="standard-button">X</button><br />
          </div>


        </div>

      ))}


    </>
  );
}

export default Lists;
