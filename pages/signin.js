import React, { useState } from 'react';
import _dynamic from 'next/dynamic';
import Image from 'next/image';
import { createUser } from '../apiclient/wizardFetch';

function Login() {

    const [signIn, setSignIn] = useState(true);
    const [signUp, setSignUp] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [createEmail, setCreateEmail] = useState('');
    const [createPassword, setCreatePassword] = useState('');
    const [validatePassword, setValidatePassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [createEmailError, setCreateEmailError] = useState('');
    const [createPasswordError, setCreatePasswordError] = useState('');
    const [validatePasswordError, setValidatePasswordError] = useState('');

    function toggleForm () {
        if (signIn === true) {
            setSignUp(true);
            setSignIn(false);
        } else if (signUp === true) {
            setSignUp(false);
            setSignIn(true);
        }
    }

    async function onCreateUser(user) {
        console.log(user);
        await createUser(user);
    }

    function checkForSignInErrors(){
        if (emailInput.length === 0 && passwordInput.length === 0) {
            setEmailError('*Please enter a valid email');
            setPasswordError('*Please enter a valid password');
        } else if (emailInput.length === 0) {
            setPasswordError('');
            setEmailError('*Please enter a valid email');  
        } else if (passwordInput.length === 0) {
            setEmailError('');
            setPasswordError('*Please enter a valid password');
        } else {
            setEmailError('');
            setPasswordError('');
        }
    };

    function checkForSignUpErrors(){
        if (createEmail.length === 0 && createPassword.length === 0 && validatePassword.length === 0) {
            setCreateEmailError('*Please enter a valid email');
            setCreatePasswordError('*Please enter a valid password');
            setValidatePasswordError('*Please make sure the passwords match');
        } else if (createEmail.length === 0 && createPassword.length === 0) {
            setCreateEmailError('*Please enter a valid email');
            setCreatePasswordError('*Please enter a valid password');
            setValidatePasswordError('');
        } else if (createEmail.length === 0 && validatePassword.length === 0) {
            setCreateEmailError('*Please enter a valid email');
            setCreatePasswordError('');
            setValidatePasswordError('*Please make sure the passwords match');
        } else if (createPassword.length === 0 && validatePassword.length === 0){
            setCreateEmailError('');
            setCreatePasswordError('*Please enter a valid password');
            setValidatePasswordError('*Please make sure the passwords match');
        } else if (createEmail.length === 0) {
            setCreateEmailError('*Please enter a valid email');
            setCreatePasswordError('');
            setValidatePasswordError('');
        } else if (createPassword.length === 0) {
            setCreateEmailError('');
            setCreatePasswordError('*Please enter a valid password');
            setValidatePasswordError('');
        } else if (validatePassword.length === 0) {
            setCreateEmailError('');
            setCreatePasswordError('');
            setValidatePasswordError('*Please make sure the passwords match'); 
        } else {
            setCreateEmailError('');
            setCreatePasswordError('');
            setValidatePasswordError(''); 
            onCreateUser(_user);
        }
    };

    const _user = { createEmail, createPassword, validatePassword };

    return (
        <div>
      {
          signIn && (
        <div>
          <div className="signInHeader">
            <div ClassName="signInHeaderLogoContainer">
                <Image className="signInHeaderLogo" src="/../public/images/lyfeTealDotsCopy.png" width={50} height={50}></Image>
            </div>
          </div>
          <div className="signInBox">
              <h1 className="signInHeadline">Sign in</h1>
              <h3>to build your financial plan</h3>
              <input
              name="emailInput"
              className="signInInput"
              placeholder="Email"
              onChange={e=> 
                setEmailInput(e.target.value)
                }></input><br></br>
              <p className="errors">{emailError}</p>
              <input
              name="passwordInput"
              className="signInInput"
              placeholder="Password"
              type="password"
              onChange={e=> 
                setPasswordInput(e.target.value)
                }></input><br></br>
              <p className="errors">{passwordError}</p>
              <button onClick={checkForSignInErrors} className="signInButton">Sign in</button>
              <p className="createAccount">New to Financial Plan Builder? <b className="createAccountToggle" onClick={toggleForm}>Sign up now.</b></p>
          </div>
        </div>
          )}
          {
              signUp && (
            <div>
                <header className="signInHeader">
                  <Image className="signInHeaderLogo" src="/../public/images/LyfeTealDotsCopy.png" width={50} height={50}></Image>
                </header>
                <div className="signInBox">
                    <h1 className="signInHeadline">Sign Up</h1>
                    <h3>to build your financial plan</h3>
                    <input
                    name="createEmail"
                    className="signInInput"
                    placeholder="Email"
                    onChange={e=> 
                        setCreateEmail(e.target.value)
                        }></input><br></br>
                    <p className="errors">{createEmailError}</p>
                    <input
                    name="createPassword"
                    className="signInInput"
                    placeholder="Password"
                    type="password"
                    onChange={e=> 
                        setCreatePassword(e.target.value)
                        }></input><br></br>
                    <p className="errors">{createPasswordError}</p>
                    <input
                    name="validatePassword"
                    className="signInInput"
                    placeholder="Validate Password"
                    type="password"
                    onChange={e=> 
                        setValidatePassword(e.target.value)
                        }></input><br></br>
                    <p className="errors">{validatePasswordError}</p>
                    <button onClick={checkForSignUpErrors} className="signInButton">Sign Up</button>
                    <p className="createAccount">Already have an account? <b className="createAccountToggle" onClick={toggleForm}>Sign in now.</b></p>
                </div>
                </div>
              )}
    </div>
    )
  } 
  
  export default Login;

  // I'll have to add create account feature as well as sign in feature & a toggle between each UI as well