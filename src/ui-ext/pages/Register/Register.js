import "./Register.css";
import React, { useEffect, useState, useRef } from "react";

const Register = () => {
    const [fName, setFName] = useState("");
    const [sName, setSName] = useState("");
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showAreaCode, setShowAreaCode] = useState(false);


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
                </div>




                {/* end of form */}
            </form>
        </div>
    );
};

export default Register;
