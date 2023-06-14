import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as contactActions from '../../store/contacts';


function Contacts() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(contactActions.getAllContactsThunk());
    }, [dispatch]);

    const allContacts = useSelector((state) => state.contacts.allContacts);
    const arrContacts = Object.values(allContacts).sort(function (x, y) {
        let a = x.name.toUpperCase(),
            b = y.name.toUpperCase();
        return a === b ? 0 : a > b ? 1 : -1;
    });

    // const taskIn = useSelector((state) => state.tasks.currentTask);
    // let task;
    // if (taskIn.length) {
    //     task = taskIn[0]
    // }

    let [constId, setConstId] = useState('');
    let [constName, setConstName] = useState('');
    let [constAddress, setConstAddress] = useState('');
    let [constCity, setConstCity] = useState('');
    let [constState, setConstState] = useState('');
    let [constZip, setConstZip] = useState('');
    let [constPhone, setConstPhone] = useState('');
    let [constUrl, setConstUrl] = useState('');
    let [errors, setErrors] = useState([]);

    const stateArr = [' ', 'AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UM', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY']

    useEffect(() => {
        console.log('id:', constId);
        console.log('name:', constName);
        console.log('address:', constAddress);
        console.log('city:', constCity);
        console.log('state:', constState);
        console.log('zip:', constZip);
        console.log('phone:', constPhone);
        console.log('url:', constUrl);
    }, [constId, constName, constAddress, constCity, constState, constZip, constPhone, constUrl])



    // useEffect(() => {
    //     setId(task?.id)
    //     setListId(task?.list_id)
    //     setName(task?.name)
    //     setDescription(task?.description)
    //     setDueDate(task?.due_date)
    //     setCompleted(task?.completed)
    //     setPriority(task?.priority)
    //     setIsChecked(task?.completed)
    //     setErrors([]);
    //     handleConfirmation('cancel')
    //     if (originalList === null) {
    //         setOriginalList()
    //     }
    // }, [task?.id, task?.list_id, task?.name, task?.description, task?.due_date, task?.completed, task?.priority, originalList]);

    // // =========

    // useEffect(() => {
    //     dispatch(taskActions.getListTasksThunk(listId));
    // }, [dispatch, listId]);

    // const allLists = useSelector((state) => state.lists.allLists);
    // const arrLists = Object.values(allLists);

    // // =========

    function handleCloseRight() {
        window.showHideContactbar('hide')
    }

    // // =========

    // const handleCompleted = (e) => {
    //     setIsChecked(!isChecked);
    //     setCompleted(!isChecked);
    // };

    const editContact = async (e) => {
        e.preventDefault();
        const data = await dispatch(contactActions.editContactThunk(constId, constName, constAddress, constCity, constState, constZip, constPhone, constUrl));
        if (data) {
            setErrors(data);
            return
        } else {
            document.getElementById('edit-contact-' + constId).style.display = 'none'
            document.getElementById('show-contact-' + constId).style.display = 'block'
        }
    };


    const addContact = async (e) => {
        e.preventDefault();
        const data = await dispatch(contactActions.addContactThunk(constName, constAddress, constCity, constState, constZip, constPhone, constUrl));
        if (!data.id) {
            setErrors(data);
            return
        } else {
            handleNewContactDisplay('hide');
        }
    };


    const deleteContact = async (e) => {
        e.preventDefault();
        const data = await dispatch(contactActions.deleteContactThunk(constId));
        if (data) {
            setErrors(data);
            return
        }
        setConstId('')
        setConstName('')
        setConstAddress('')
        setConstCity('')
        setConstState('')
        setConstZip('')
        setConstPhone('')
        setConstUrl('')
        setErrors([])
    };

    // ===================

    function handleNewContactDisplay(action) {
        if (action === 'show') {
            if (constId) {
                document.getElementById('show-contact-' + constId).style.display = 'block'
                document.getElementById('edit-contact-' + constId).style.display = 'none'
            }
            document.getElementById('new-contact-form').style.display = 'block'
            document.getElementById('new-contact-button').style.display = 'none'
        } else {
            document.getElementById('new-contact-form').style.display = 'none'
            document.getElementById('new-contact-button').style.display = 'block'
        }
        setConstId('')
        setConstName('')
        setConstAddress('')
        setConstCity('')
        setConstState('')
        setConstZip('')
        setConstPhone('')
        setConstUrl('')
        setErrors([])
    }

    function handleEditContactDisplay(action, id, name, address, city, state, zip, phone, url) {
        if (action === 'show') {
            if (constId) {
                document.getElementById('show-contact-' + constId).style.display = 'block'
                document.getElementById('edit-contact-' + constId).style.display = 'none'
            }
            document.getElementById('new-contact-form').style.display = 'none'
            document.getElementById('new-contact-button').style.display = 'block'
            setConstId(id)
            setConstName(name)
            setConstAddress(address)
            setConstCity(city)
            setConstState(state)
            setConstZip(zip)
            setConstPhone(phone)
            setConstUrl(url)
            setErrors([])
            document.getElementById('edit-contact-' + id).style.display = 'block'
            document.getElementById('show-contact-' + id).style.display = 'none'
        } else {
            document.getElementById('edit-contact-' + id).style.display = 'none'
            document.getElementById('show-contact-' + id).style.display = 'block'
            setConstId('')
            setConstName('')
            setConstAddress('')
            setConstCity('')
            setConstState('')
            setConstZip('')
            setConstPhone('')
            setConstUrl('')
            setErrors([])
        }
    }

    function handleConfirmation(action, id) {
        if (action === 'show') {
            document.getElementById('initiate-contact-delete-' + id).style.display = 'none'
            document.getElementById('confirm-contact-delete-' + id).style.display = 'block'
        } else {
            document.getElementById('initiate-contact-delete-' + id).style.display = 'block'
            document.getElementById('confirm-contact-delete-' + id).style.display = 'none'
        }
    }

    // =========

    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ paddingTop: '20px', color: '#0060bf', fontWeight: '600', fontSize: '18px' }}>Contacts</div>
                <button style={{ marginBottom: '20px' }} className="close-popup" onClick={() => { handleCloseRight() }}><i className="fas fa-times" /></button >
            </div >

            <div id="new-contact-button" style={{ fontSize: '14px', marginBottom: '10px' }}><button onClick={() => { handleNewContactDisplay('show') }} className="addcontact-button"><i style={{ fontSize: '12px', paddingRight: '4px' }} className="far fa-address-book" />New Contact</button></div>

            <div id="new-contact-form" style={{ display: 'none', borderTop: '1px solid grey', borderBottom: '1px solid grey', margin: '20px 0px', paddingBottom: '15px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', padding: '20px 0px 14px 0px' }}><div style={{ color: 'rgb(0, 96, 191)', fontWeight: '600', fontSize: '15px' }}>Add New Contact</div><button className="close-popup" style={{ transform: 'none', fontSize: '11px', alignSelf: 'end', marginBottom: '5px' }} onClick={() => { handleNewContactDisplay('hide') }}>CANCEL <i className="far fa-times-circle" style={{ fontSize: '11px' }} /></button></div>

                {errors.length > 0 &&
                    <div style={{ margin: '0px 0px 12px 10px', color: 'red', display: 'block' }}>
                        {errors.map((error, idx) => <li key={idx}>{error.slice(error.indexOf(': ') + 1)}</li>)}
                    </div >
                }

                <form onSubmit={addContact}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div className="contactform-holder" style={{ marginBottom: '6px' }}><b>Name:</b><input style={{ margin: '0px 0px 0px 0px' }} className="editcontact-input-field" type="text" value={constName} onChange={(e) => setConstName(e.target.value)} required /></div>
                        <div className="contactform-holder"><b>Address:</b><input style={{ margin: '0px 0px 0px 0px' }} className="editcontact-input-field" type="text" value={constAddress} onChange={(e) => setConstAddress(e.target.value)} /></div>
                        <div className="contactform-holder" style={{ marginBottom: '6px' }}>
                            <b>City:</b> <input style={{ margin: '0px 0px 0px 0px' }} className="editcontact-input-field" type="text" value={constCity} onChange={(e) => setConstCity(e.target.value)} />
                            &nbsp;<b>State:</b>
                            <select className="editcontact-input-field" style={{ height: '25px' }} value={constState} onChange={(e) => setConstState(e.target.value)}>
                                {stateArr?.map((value) => (
                                    <option key={value} value={value}>{value}</option>
                                ))
                                }
                            </select>
                            &nbsp;<b>Zip:</b><input style={{ margin: '0px 0px 0px 0px', width: '100%' }} className="editcontact-input-field" type="text" value={constZip} onChange={(e) => setConstZip(e.target.value)} />
                        </div>
                        <div className="contactform-holder" style={{ marginBottom: '6px' }}><b>Telephone:</b><input style={{ margin: '0px 0px 0px 0px' }} className="editcontact-input-field" placeholder="555-555-5555" type="text" value={constPhone} onChange={(e) => setConstPhone(e.target.value)} /></div>
                        <div className="contactform-holder"><b>URL:</b><input style={{ margin: '0px 0px 0px 0px' }} className="editcontact-input-field" type="text" value={constUrl} onChange={(e) => setConstUrl(e.target.value)} /></div>
                        <button style={{ margin: '10px 110px 10px 110px', fontSize: '12px', padding: '4px 18px 4px 18px' }} className="logout-button" type="submit"><i className="far fa-edit" style={{ fontSize: '12px' }} />&nbsp;&nbsp;Add Contact</button>

                    </div>
                </form>

            </div>

            <div style={{ maxHeight: 'calc(100vh - 160px)', overflow: 'auto' }}>
                {arrContacts?.map(({ id, name, address, city, state, zip, phone, url }) => (
                    <div key={id} style={{ border: '1px solid #bdbdbd', padding: '10px', margin: '0px 0px 10px 0px', backgroundColor: '#fafafa', borderRadius: '8px', fontSize: '13px' }}>

                        <div id={`show-contact-${id}`} className="contacts">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 'bold', fontSize: '14px' }}>{name}</span><button onClick={() => { handleEditContactDisplay('show', id, name, address, city, state, zip, phone, url) }} className="editcontact-button"><i style={{ fontSize: '11px' }} className="far fa-edit" /></button></div>
                            {address && (<div style={{ color: '#696969', paddingTop: '1px' }}>{address}</div>)}
                            {city && (<div style={{ color: '#696969' }}>{city}, {state} {zip}</div>)}
                            {phone && (<div style={{ paddingTop: '4px' }}><a href={`tel:${phone}`}>{phone}</a></div>)}
                            {url && (<div style={{ paddingTop: '4px' }}><a title={name} href={url} target={'_blank'} rel="noopener noreferrer external">{url}</a></div>)}
                        </div>

                        <div id={`edit-contact-${id}`} style={{ display: 'none' }} className="contacts">
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0px 10px 0px' }}><div style={{ color: 'rgb(0, 96, 191)', fontWeight: '600', fontSize: '15px' }}>Edit Contact</div><button className="close-popup" style={{ transform: 'none', fontSize: '11px', alignSelf: 'end', marginBottom: '5px' }} onClick={() => { handleEditContactDisplay('hide', id) }}>CANCEL <i className="far fa-times-circle" style={{ fontSize: '11px' }} /></button></div>

                            {errors.length > 0 &&
                                <div style={{ padding: '0px 0px 14px 20px', color: 'red', display: 'block' }}>
                                    {errors.map((error, idx) => <li key={idx}>{error.slice(error.indexOf(': ') + 1)}</li>)}
                                </div >
                            }

                            <form onSubmit={editContact}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <div className="contactform-holder" style={{ marginBottom: '6px' }}><b>Name:</b><input style={{ margin: '0px 0px 0px 0px' }} className="editcontact-input-field" type="text" value={constName} onChange={(e) => setConstName(e.target.value)} required /></div>
                                    <div className="contactform-holder"><b>Address:</b><input style={{ margin: '0px 0px 0px 0px' }} className="editcontact-input-field" type="text" value={constAddress} onChange={(e) => setConstAddress(e.target.value)} /></div>
                                    <div className="contactform-holder" style={{ marginBottom: '6px' }}>
                                        <b>City:</b> <input style={{ margin: '0px 0px 0px 0px', width: '100%' }} className="editcontact-input-field" type="text" value={constCity} onChange={(e) => setConstCity(e.target.value)} />
                                        &nbsp;<b>State:</b>
                                        <select className="editcontact-input-field" style={{ height: '25px' }} value={constState} onChange={(e) => setConstState(e.target.value)}>
                                            {stateArr?.map((value) => (
                                                <option key={value} value={value}>{value}</option>
                                            ))
                                            }
                                        </select>
                                        &nbsp;<b>Zip:</b><input style={{ margin: '0px 0px 0px 0px', width: '40%' }} className="editcontact-input-field" type="text" value={constZip} onChange={(e) => setConstZip(e.target.value)} />
                                    </div>
                                    <div className="contactform-holder" style={{ marginBottom: '6px' }}><b>Telephone:</b><input style={{ margin: '0px 0px 0px 0px' }} className="editcontact-input-field" type="text" value={constPhone} onChange={(e) => setConstPhone(e.target.value)} /></div>
                                    <div className="contactform-holder"><b>URL:</b><input style={{ margin: '0px 0px 0px 0px' }} className="editcontact-input-field" type="text" value={constUrl} onChange={(e) => setConstUrl(e.target.value)} /></div>
                                    <button style={{ margin: '10px 105px 10px 105px', fontSize: '12px', padding: '4px 18px 4px 18px' }} className="logout-button" type="submit"><i className="far fa-edit" style={{ fontSize: '12px' }} />&nbsp;&nbsp;Change Contact</button>

                                    <div style={{ textAlign: 'center' }}>
                                        <div id={`initiate-contact-delete-${id}`} style={{ margin: '0px 125px 0px 125px', textAlign: 'center', cursor: 'pointer', fontSize: '11px', padding: '2px 2px 2px 2px' }} className="deletetask-button-init" type="submit" onClick={() => { handleConfirmation('show', id) }}><i className="far fa-times-circle" style={{ fontSize: '11px' }} />&nbsp;&nbsp;Delete Contact</div>
                                    </div>

                                </div>
                            </form>

                            <div id={`confirm-contact-delete-${id}`} style={{ display: 'none' }}>
                                <form onSubmit={deleteContact}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                        <div style={{ fontSize: '12px' }}>Permanently delete this contact?</div>
                                        <div style={{ display: 'flex', textAlign: 'center', marginTop: '10px' }}>
                                            <div style={{ margin: '0px 5px 0px 0px', cursor: 'pointer', fontSize: '11px', padding: '3px 10px 2px 10px' }} className="logout-button" onClick={() => { handleConfirmation('cancel', id) }}>NO</div>
                                            <button style={{ margin: '0px 0px 0px 5px', fontSize: '11px', padding: '3px 10px 2px 10px' }} className="deletetask-button" type="submit">YES</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>


                    </div >
                ))
                }

            </div >

        </>
    );
}

export default Contacts;
