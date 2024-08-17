import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand h1" to="/">Distributed Computing</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/skills">Skills</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/projects">Projects</Link>
                            </li>
                        </ul>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100px',
                        height: '100%',
                        color: 'white'
                    }}>
                        {/* logout button */}
                        <div className="btn btn-outline-light" onClick={() => {
                            localStorage.removeItem('token')
                            navigate('/login')
                        }}>Logout</div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
