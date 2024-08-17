import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className='home'>
                {login ? <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '90vh',
                    flexDirection: 'column',
                    padding: '0 3rem',
                    width: '40%',
                    margin: 'auto',
                    alignContent: 'center',
                }}>
                    <h1 style={{
                        fontSize: '80px',
                        color: 'white',
                        fontFamily: 'monospace',
                        textAlign: 'center'
                    }}>Login</h1>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {/* <input type='text' className='form-control' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} /> */}
                        <input type='email' className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type='password' className='form-control' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='btn btn-primary' style={{
                            marginTop: '2rem',
                            padding: '0.5rem 0.5rem',
                            fontSize: '24px',
                            borderRadius: '10px',
                        }} onClick={() => {
                            Axios.post('http://localhost:3000/auth/login', {
                                email,
                                password
                            }).then(({ data }) => {
                                if (data.status === 200) {
                                    console.log(data)
                                    localStorage.setItem('token', data.token)
                                    navigate('/')
                                } else {
                                    toast.error(data.message)
                                }
                            })
                        }}>Login</button>
                    </div>
                    <p style={{
                        color: 'white',
                        textAlign: 'center',
                        marginTop: '2rem'
                    }}>Don't have an account? <span style={{
                        color: 'blue',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        color: 'white',
                        fontWeight: 'bold'

                    }} onClick={() => {
                        setLogin(false)
                        setUsername('')
                        setEmail('')
                        setPassword('')
                    }}>Register</span></p>
                </div>
                    :
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '90vh',
                        flexDirection: 'column',
                        padding: '0 3rem',
                        width: '40%',
                        margin: 'auto',
                        alignContent: 'center',
                    }}>
                        <h1 style={{
                            fontSize: '80px',
                            color: 'white',
                            fontFamily: 'monospace',
                            textAlign: 'center'
                        }}>Register</h1>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <input type='text' className='form-control' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input type='email' className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type='password' className='form-control' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className='btn btn-primary' style={{
                                marginTop: '2rem',
                                padding: '0.5rem 0.5rem',
                                fontSize: '24px',
                                borderRadius: '10px',
                            }} onClick={() => {
                                Axios.post('http://localhost:3000/auth/register', {
                                    username,
                                    email,
                                    password
                                }).then(({ data }) => {
                                    if (data.status === 200) {
                                        localStorage.setItem('token', data.token)
                                        navigate('/')
                                    } else {
                                        toast.error(data.message)
                                    }
                                })
                            }}>Register</button>
                        </div>
                        <p style={{
                            color: 'white',
                            textAlign: 'center',
                            marginTop: '2rem'
                        }}>Already have an account? <span style={{
                            color: 'blue',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            color: 'white',
                            fontWeight: 'bold'

                        }} onClick={() => {
                            setLogin(true)
                            setUsername('')
                            setEmail('')
                            setPassword('')
                        }}>Login</span></p>
                    </div>
                }

            </div>
        </>
    )
}

export default Login
