import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

// components

export default function Home() {


    return (
        <>
            <Helmet>
                <title>Home page</title>
            </Helmet>
            <h1>this is home</h1>
        </>
    );
}
