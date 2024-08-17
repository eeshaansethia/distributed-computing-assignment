import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])
    return (
        <div className='home'>
            <Navbar />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                height: '90vh',
                flexDirection: 'column',
                padding: '0 3rem'
            }}>
                <h1 style={{
                    fontSize: '80px',
                    color: 'white',
                    fontFamily: 'monospace'
                }}>Hello, how are you doing today?</h1>
                <h1 style={{
                    fontSize: '70px',
                    color: 'white',
                    fontFamily: 'monospace'
                }}>Welcome to my Portfolio!</h1>
                <div>
                    <button className='btn btn-primary' style={{
                        marginTop: '2rem',
                        padding: '0.5rem 2rem',
                        fontSize: '30px',
                        borderRadius: '10px'
                    }} onClick={() => {
                        navigate('/skills')
                    }}>Skills</button>
                    <button className='btn btn-primary' style={{
                        marginTop: '2rem',
                        padding: '0.5rem 2rem',
                        fontSize: '30px',
                        borderRadius: '10px',
                        marginLeft: '2rem'
                    }} onClick={() => {
                        navigate('/projects')
                    }}>Projects</button>
                </div>

            </div>
        </div>
    )
}

export default Home
