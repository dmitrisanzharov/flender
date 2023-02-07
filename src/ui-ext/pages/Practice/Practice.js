import React, { useEffect, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const Practice = () => {

    const key = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

    const [captchaIsDone, setCaptchaDone] = useState(false);


    function onChange() {
        console.log('changed')
        setCaptchaDone(true)
    }


    return (
        <div>
            <ReCAPTCHA
                sitekey={key}
                onChange={onChange}
            />
            <hr />
            {captchaIsDone && <button>submit</button>}
        </div>
    )
}

export default Practice