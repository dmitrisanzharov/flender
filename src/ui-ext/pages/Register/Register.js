import "./Register.css";
import React, { useEffect, useState, useRef } from "react";
import { areaCodes } from '../../../utils/areaCodes';
import { redirect } from "react-router-dom";

const Register = () => {
    const [fName, setFName] = useState("");
    const [sName, setSName] = useState("");
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [telArea, setTelArea] = useState('select');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
    const [signUpDisabled, setSignUpDisabled] = useState(true);

    // useRefs
    const password1 = useRef();
    const passwordConfirm1 = useRef();






    // FUNCTIONS

    const showPassword = (field) => {
        if (field.current.type === 'password') {
            field.current.type = 'text'
        } else {
            field.current.type = 'password'
        }
    }




    // useEffect

    useEffect(() => {

        if (passwordConfirm !== password) {
            setDoPasswordsMatch(false);
            setSignUpDisabled(true);
            return
        }

        if (password === '' && passwordConfirm === '') {
            setSignUpDisabled(true);
            return
        }

        setDoPasswordsMatch(true);
        setSignUpDisabled(false);

    }, [passwordConfirm])






    return (
        <div className="RegisterContainer">
            <h1>Join today and start investing in minutes.</h1>

            <form>
                {/* First name */}

                <div className="RegisterContainer_input_element">
                    <label>First Name</label>
                    <br />
                    <input
                        type="text"
                        value={fName}
                        onChange={(e) => setFName(e.target.value)}
                    />
                </div>

                {/* Second Name */}
                <div className="RegisterContainer_input_element">
                    <label>Second Name</label>
                    <br />
                    <input
                        type="text"
                        value={sName}
                        onChange={(e) => setSName(e.target.value)}
                    />
                </div>


                {/* Email */}
                <div className="RegisterContainer_input_element">
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>


                {/* telephone */}
                <div className="RegisterContainer_input_element">
                    <label>Mobile number</label>
                    <br />
                    <select value={telArea} onChange={(e) => setTelArea(e.target.value)}>
                        {areaCodes && areaCodes.map(el => {
                            return (
                                <option value={el} key={el}>{el}</option>
                            )
                        })}
                    </select>



                    <input
                        type="tel"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                    />
                </div>


                {/* password */}
                <div className="RegisterContainer_input_element">
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        ref={password1}
                    />
                    <button type='button' onClick={() => showPassword(password1)} >show</button>
                </div>

                {/* confirm password */}
                <div className="RegisterContainer_input_element">
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        ref={passwordConfirm1}
                    />
                    <button type='button' onClick={() => showPassword(passwordConfirm1)} >show</button>
                    {!doPasswordsMatch && (
                        <span style={{ color: 'red', border: '1px solid red', marginLeft: '20px', padding: '10px' }}>passwords do NOT match</span>
                    )}
                </div>


                <div className="RegisterContainer_input_element">
                    <button type='submit' disabled={signUpDisabled}>Sign Up</button>
                </div>




                {/* end of form */}
            </form>
        </div>
    );
};

export default Register;
