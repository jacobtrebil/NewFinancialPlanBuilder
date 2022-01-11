import React, { useState } from 'react';
import Link from 'next/link';
import _dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from "next/router";
import { updatePhoneNumber, createToken, verifyToken, getTokenInfoCall, verified } from '../apiclient/wizardFetch';
import { authenticator, totp, hotp } from 'otplib';

function StartPlan() {

  const router = useRouter();
  const {planId} = router.query

  function back() {
    router.push(`/`);
  }

  const secret = Math.floor(100000 + Math.random() * 900000);
  // This generates a new code on each refresh
  const token = authenticator.generate(secret);
  /* const isValid = totp.check(token, secret); */

  const [errors, setErrors] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const [buttonLabel, setButtonLabel] = useState('Verify Now')
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [phoneNumberErrors, setPhoneNumberErrors] = useState('')
  const [codeErrors, setCodeErrors] = useState('')
  const [verify, setVerify] = useState('')
  const [tokenDocumentInfo, setTokenDocumentInfo] = useState([]);
  let [_plan, _setPlan] = useState({});
  let [_verify, _setVerify] = useState({});

  const onUpdatePhoneNumber = async (newPlan) => {
    const updatedPhoneNumber = await updatePhoneNumber(planId, newPlan);
    const createdToken = await createToken(planId, newPlan);
}



/**
 * In thei api  verify call, check whether code entered by the user,
 * matches the once which has been sent. if that happens, remove the token record
 * and send 200 with response excluding the token itself.
 * 
 * If the token does not match, then return 422.
 * In front-end check if status is non 200, in that case show error, other wise 
 * move to next step.
 */


  // response =  await response.json()
  // response.code >= 200 && response.code < 400 // success case
  // else the failure case
  // By doing things this way, I shouldn't need the 2nd GET call, just the original
  // Verify API call. UpdatePhone -> token -> verify & verified in 1 call and 
  // return the info in that call as well

  const onInputVerificationCode = async (newPlan) => {
    const updatedVerify = await verifyToken(planId, newPlan);
  }

  const getTokenInfo = async () => {
    const tokenInfo = await getTokenInfoCall(planId);
    setTokenDocumentInfo(tokenInfo);
  }

  const verifyCode = async (newPlan) => {
    const verifiedCode = await verified(planId, newPlan);
  }

  function checkVerified(tokenDocumentInfo) {
    if (tokenDocumentInfo[0].verified === true) {
      console.log(true);
    } else {
      console.log(false);
      /* setCodeErrors('Sorry, that code is incorrect. Please try again.') */
    }
  }

  async function onButtonClick() {
    if (!showCodeInput) {
      checkPhoneNumberForErrors();
    } else {
      inputCode();
      verifyCode();
      await getTokenInfo();
      console.log(tokenDocumentInfo);
      /* checkVerified(tokenDocumentInfo); */
      // get info from db
      // function that checks for errors or sends them to the next step & deletes doc
      // add stuff here 
    }
    }

  function checkPhoneNumberForErrors() {
    if (phoneNumber.length <= 8) {
      setPhoneNumberErrors('*Please enter a valid phone number');
    } else {
      setPhoneNumberErrors('*Verification Code sent. It may take a few minutes to recieve your code. Please enter it below...');
      updateButtonAndInputs();
    }
  }

  function updateButtonAndInputs() {
    setButtonLabel('Complete Verification');
    setShowCodeInput(true);
    onUpdatePhoneNumber(_plan);
    console.log(secret);
  }

  function inputCode() {
    onInputVerificationCode(_verify);
  }

  _plan = { phoneNumber, token, planId };
  _verify = { verify };

  // Next, I should add in checks for phone number and an API call to add it to the database in the correct
  // Format if it is correct.

  // How do I make the function stop running when an error occurs?

    return (
      <div>
          <div className="createAPlanBox">
            <h1 className="createAPlan">Verify Your Identity To <br></br> Get Your Financial Plan</h1>
            <p>Enter your phone number and we will text you a 6-digit verification code</p>
            <div className="inputsDiv">
              <div className="smsLabelBlock">
                  <label className="smsLabels">Phone Number</label><br></br>
              </div>
              <input
                      name="dateOfBirthDay"
                      className="smsInputs"
                      value={phoneNumber}
                      placeholder="000-000-0000"
                      onChange={e=> 
                          setPhoneNumber(e.target.value)
                          }
                      type="input"
                      /><br></br>
                      <p className="smsErrors">{phoneNumberErrors}</p>
                      { showCodeInput && (
                      <div>
                        <div className="smsLabelBlock">
                          <label className="smsLabels">Verification Code</label><br></br>
                        </div>
                        <input
                        name="dateOfBirthYear"
                        className="smsInputs"
                        value={verify}
                        placeholder="000000"
                        onChange={e=> 
                            setVerify(e.target.value)
                            }
                            type="input"
                        /><br></br>
                      </div>
                      )}
                      <p className="smsErrors">{codeErrors}</p>
                      </div>
            <button type="submit" onClick={onButtonClick} className="smsButton">{buttonLabel} &#187;</button>
          </div>
      </div>
    );
  } 

  // The button should first say "Verify Now ➡" and then "Complete Verification ➡", this should be a
  // Separate variable that is dynamically updated based on the step of the process they are in

  // I could have a function that fires on button click that changes the button text and adds the new input
  // Field. It would also have to do something different based on if they've put in their code or not yet 
  // Though. It can't use a Link to send people to the next step either, that must be a part of the onClick
  // Function as well. 
  
  export default StartPlan;