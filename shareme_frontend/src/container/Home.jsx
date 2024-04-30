import React, { useState, useRef, useEffect } from 'react'
import { HiMenu } from "react-icons/hi"
import { AiFillCloseCircle } from "react-icons/ai"
import { Link, Route, Routes } from "react-router-dom"
// import SideBar from '../components/SideBar'
// import UserProfile from '../components/UserProfile'
import { Sidebar, UserProfile } from '../components/index'
import { client } from "../client"
import { userQuery } from "../utils/data"
import logo from "../assets/logo.png"
import Pins from './Pins'
import { fetchUser } from '../utils/fetchUser'

const Home = () => {
    const [toggle, setToggle] = useState(false);
    const [user, setUser] = useState();
    const userInfo = fetchUser();
    // console.log(userInfo);
    const scrollRef = useRef(null);
    useEffect(() => {
        const query = userQuery(userInfo?.sub);

        client.fetch(query).then((data) => {
            console.log(data);
            
            setUser(data[0]);
        });
    }, []);
    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)
    })
    // const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    // useEffect(()=>{
    //     const query = userQuery(userInfo?.googleId);
    //     client.fetch(query).then((data)=>{
    //             setUser(data[0]);
    //         });
    // },[]);
    // console.log(user);
    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar user={user && user} />
            </div>
            <div className="flex md:hidden flex-row">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggle(true)} />
                    <Link to='/'>
                        <img src={logo} alt="logo" className='w-28' />
                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                        {/* {console.log(user?.userName)} */}
                        {/* {console.log(user?.image)} */}
                        <img src={user?.image} alt="user-pic" className="w-28 h-9 rounded-full " />
                    </Link>
                </div>
            {toggle && (
                <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in '>
                    <div className="absolute w-full flex justify-end items-center p-2">
                        <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggle(false)} />
                    </div>
                    <Sidebar user={user && user} closeToggle={setToggle} />
                </div>
            )}
            </div>
            <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                <Routes>
                    <Route path='/user-profile/:userId' element={<UserProfile />} />
                    <Route path='/*' element={<Pins user={user && user} />} />
                </Routes>
            </div>
        </div>
    )
}

export default Home;