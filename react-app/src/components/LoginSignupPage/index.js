import React, { useState, useEffect, useRef } from "react";
import { login, signUp } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import signinupLogo from './rem-eggs-login-logo.svg'
import './login.css';
import * as listActions from '../../store/lists'

function LoginSignupPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [username, setUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState([]);

    const [formType, setFormType] = useState('login')

    let signInForm = useRef(null);
    let signUpForm = useRef(null);
    let formTitle = useRef(null);

    useEffect(() => {
        const signIn = signInForm.current;
        const signUp = signUpForm.current;
        const titleText = formTitle.current;
        setEmail("");
        setPassword("");
        setUsername("");
        setFirstName("");
        setLastName("");
        setConfirmPassword("");
        setErrors([]);

        if (formType === 'login') {
            signIn.style.display = "block";
            signUp.style.display = "none";
            titleText.innerText = "Sign In";
        } else {
            signIn.style.display = "none";
            signUp.style.display = "block";
            titleText.innerText = "Sign Up";
        }

    }, [formType])


    if (sessionUser) return <Redirect to="/" />;

    const handleDemo = () => {
        setEmail('demo@aa.io');
        setPassword('password');
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
            return
        }
        history.push("/home");
    };

    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const data = await dispatch(signUp(username, email, password, first_name, last_name));
            if (data) {
                setErrors(data)
                return
            }
        } else {
            setErrors(['Password does not match confirmation password.']);
            return
        }

        await dispatch(listActions.addChannelThunk('Inbox', 'inbox'))
        await dispatch(listActions.addChannelThunk('Trash', 'trash'))
        history.push("/home");
    };


    return (

        <>

            <div className="login-signup" style={{ height: '100%' }}>

                <div style={{ textAlign: 'center' }}>
                    <img src={`${signinupLogo}`} alt="Smack" style={{ width: '155px ' }} />
                </div>

                <div ref={formTitle}
                    style={{ textAlign: 'center', fontSize: '42px', fontWeight: '700', paddingTop: '20px', paddingBottom: '14px' }}>
                    Sign In
                </div >


                {/* %%%%%% SIGN IN FORM %%%%%%  */}
                <div ref={signInForm} style={{ display: 'block', marginBottom: '90px' }}>

                    < div style={{
                        textAlign: 'center', fontSize: '18px', color: '#000000'
                    }}>
                        Already a member ?&nbsp;&nbsp;&nbsp;<b>Sign in below</b>.
                    </div >

                    <div className="form-div">

                        {errors.length > 0 &&
                            <div style={{ paddingTop: '20px', paddingLeft: '24px', color: 'red', display: 'block' }}>
                                <li>The provided credentials were invalid.</li>
                            </div >
                        }

                        <form onSubmit={handleSubmitLogin}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '24px' }}>

                                <input className="login-input-field" type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                                <input className="login-input-field" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                                <button className="login-input-submit" type="submit">Sign In</button>

                            </div>


                            <div style={{ textAlign: 'center' }}>
                                <button className="demo-user" onClick={async () => { handleDemo() }} type="submit"> Demo User</button>
                            </div>
                        </form>

                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 0px' }}>
                        < div style={{
                            height: '1px', width: '100%', backgroundColor: '#7d7d7d'
                        }}></div>
                        < div style={{
                            padding: '0px 20px'
                        }}>OR</div>
                        <div style={{
                            height: '1px', width: '100%', backgroundColor: '#7d7d7d'
                        }}></div>
                    </div >

                    <div style={{ textAlign: 'center', fontSize: '18px', color: '#000000' }}>
                        What to do, what to do...&nbsp;&nbsp;&nbsp;<b>Sign up now!</b><br />
                        <button className="create-account" onClick={() => { setFormType('signup') }}>Create an Account</button>
                    </div>

                </div >


                {/* %%%%%% SIGN UP FORM %%%%%%  */}
                <div ref={signUpForm} style={{ display: 'none', marginBottom: '90px' }}>

                    <div style={{ textAlign: 'center', fontSize: '18px', color: '#000000' }}>
                        Stop forgetting. <b> Start remembering!</b>
                    </div >

                    <div className="form-div" style={{ paddingBottom: '24px' }}>

                        {errors.length > 0 &&
                            <div style={{ paddingTop: '20px', paddingLeft: '20px', color: 'red', display: 'block' }}>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </div >
                        }

                        <form onSubmit={handleSubmitSignup}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '24px' }}>
                                <input className="login-input-field" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                                    required />
                                <input className="login-input-field" type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name"
                                    required />
                                <input className="login-input-field" type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"
                                    required />
                                <input className="login-input-field" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"
                                    required />
                                <input className="login-input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create Password" required />
                                <input className="login-input-field" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password" required />
                                <button className="login-input-submit" type="submit">Sign Up</button>
                            </div>
                        </form>

                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 0px' }}>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#7d7d7d' }}></div>
                        <div style={{
                            padding: '0px 20px'
                        }}>OR</div>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#7d7d7d' }}></div>
                    </div>

                    <div style={{ textAlign: 'center', fontSize: '18px', color: '#000000' }}>
                        Already a member ?&nbsp;&nbsp;&nbsp;<b>Sign in!</b><br />
                        <button className="create-account" onClick={() => { setFormType('login') }}>Member Sign In</button>
                    </div>

                </div >

            </div >

            {/* FOOTER  */}
            < div className="footer-holder" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >


                <div style={{ color: '#828282', fontSize: '11px', paddingBottom: '5px' }}>© {new Date().getFullYear()} Remember The Eggs</div>

                <div className="footer">

                    <div className="footer-link">
                        <span>Dave Titus:</span>
                    </div>

                    <div className="footer-link">
                        <span>
                            <a className="footer-button" href="http://creativegozone.com/" target="_blank" rel="noreferrer">
                                <button className="footer-button">
                                    <i className="fas fa-eye" style={{ fontSize: '14px' }}></i>
                                </button>
                            </a>
                        </span>
                    </div>

                    <div className="footer-link">
                        <span>
                            <a className="footer-button" href="https://github.com/dtitus929/Capstone" target="_blank" rel="noreferrer">
                                <button className="footer-button">
                                    <i className="fa fa-github" style={{ fontSize: '14px' }}></i>
                                </button>
                            </a>
                        </span>
                    </div>

                    <div className="footer-link">
                        <span>
                            <a className="footer-button" href="https://www.linkedin.com/in/djtitus/" target="_blank" rel="noreferrer">
                                <button className="footer-button">
                                    <i className="fa fa-linkedin-square" style={{ fontSize: '14px' }}></i>
                                </button>


                            </a>
                        </span>
                    </div>



                </div >




            </div >



        </>
    );
}

export default LoginSignupPage;
