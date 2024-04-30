import React from 'react'
import { FcGoogle } from 'react-icons'
import { json, useNavigate } from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import {client} from '../client'
const Login = () => {
    const navigate = useNavigate();
    return (
        <div className='flex justify-start item-center flex-col h-screen'>
            <div className="relative w-full h-full">
                <video
                    src={shareVideo}
                    type='video/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className=' w-full h-full object-cover'
                />
                <div className="absolute flex flex-col justify-center item-center top-0 left-0 bottom-0 right-0 bg-blackOverlay">
                    <div className="p-5 flex justify-center">
                        <img src={logo} width='130px' alt="logo" />
                    </div>
                    <div className="shadow-2xl w-48 mx-auto">
                        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN} >
                            <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    // console.log(credentialResponse);
                                    var decoded = jwt_decode(credentialResponse.credential);
                                    // console.log(decoded);
                                    localStorage.setItem('user', JSON.stringify(decoded));
                                    const doc = {
                                        _id: decoded.sub,
                                        _type: 'user',
                                        userName: decoded.name,
                                        image: decoded.picture
                                    }
                                    client.createIfNotExists(doc).then(()=>{
                                        navigate("/",{replace:true});
                                    }) 
                                }}
                                type='standard'
                                width='190'

                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />;
                        </GoogleOAuthProvider>;
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login