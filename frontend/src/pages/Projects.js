import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import Axios from 'axios'
import { Modal, TextField, Select, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const Projects = () => {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [search, setSearch] = useState('')
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [projectTechStack, setProjectTechStack] = useState('')
    const [skills, setSkills] = useState([])
    const [availableSkills, setAvailableSkills] = useState([])
    const [editId, setEditId] = useState('')

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    const getSkills = async () => {
        await Axios.get('http://localhost:3000/skills', {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then(({ data }) => {
                if (data.status == 200) {
                    setAvailableSkills(data.data)
                } else {
                    toast.error(data.message, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            })
            .catch((err) => {
                toast.error(err, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
    }

    const getProjects = async () => {
        await Axios.get('http://localhost:3000/projects', {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then(({ data }) => {
                if (data.status == 200) {
                    setProjects(data.data)
                } else {
                    toast.error(data.message, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            })
            .catch((err) => {
                toast.error(err, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
    }

    const columns = [
        {
            name: 'Project Name',
            selector: 'projectName',
            sortable: true
        },
        {
            name: 'Project Tech Stack',
            selector: 'projectTechStack',
            sortable: true
        },
        {
            name: 'Skills',
            selector: 'skills',
            cell: (row) => {
                return (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        {row.skills.map((skill) => {
                            return (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <div style={{
                                        padding: '5px 10px',
                                        borderRadius: '10px',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        fontSize: '15px'
                                    }}>{skill}</div>
                                </div>
                            )
                        })}
                    </div>
                )
            }
        },
        {
            name: 'Actions',
            selector: 'actions',
            sortable: true,
            cell: (row) => {
                return (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <button className="btn btn-primary" onClick={() => {
                            setShowEditModal(true)
                            setProjectName(row.projectName)
                            setProjectDescription(row.projectDescription)
                            setProjectTechStack(row.projectTechStack)
                            setSkills(row.skills)
                            setEditId(row._id)
                        }}>Edit</button>
                        <button className="btn btn-danger" onClick={() => {
                            Axios.delete(`http://localhost:3000/projects/${row._id}`, {
                                headers: {
                                    'authorization': localStorage.getItem('token')
                                }
                            })
                                .then(({ data }) => {
                                    if (data.status == 200) {
                                        toast.success(data.message, {
                                            position: "top-center",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "dark",
                                        });
                                        getProjects()
                                    } else {
                                        toast.error(data.message, {
                                            position: "top-center",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "dark",
                                        });
                                    }
                                }
                                )
                                .catch((err) => {
                                    toast.error(err, {
                                        position: "top-center",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark",
                                    });
                                }
                                )
                        }}>Delete</button>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        getProjects()
        getSkills()
    }, [])

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="dark"
            />
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 style={{
                            textAlign: 'center',
                            fontSize: '50px',
                            fontFamily: 'Roboto',
                            fontWeight: 'bold',
                            margin: '20px 0'
                        }}
                        >Projects</h1>
                        <DataTable
                            columns={columns}
                            data={projects.filter((skill) => {
                                if (search == '') {
                                    return skill
                                } else if (skill.projectName.toLowerCase().includes(search.toLowerCase())) {
                                    return skill
                                }
                            })}
                            pagination
                            subHeader
                            subHeaderComponent={
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <TextField
                                        id='outlined-basic'
                                        label='Search'
                                        variant='outlined'
                                        style={{
                                            margin: '5px'
                                        }}
                                        size='small'
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add Project</button>
                                </div>
                            }
                            subHeaderAlign='right'
                        />
                    </div>
                </div>
            </div>
            <Modal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: '35%',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <h1 style={{
                        textAlign: 'center',
                        fontSize: '30px',
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        margin: '20px 0'
                    }}
                    >Add Project</h1>
                    <TextField
                        id='outlined-basic'
                        label='Project Name'
                        variant='outlined'
                        size='small'
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <TextField
                        id='outlined-basic'
                        label='Project Description'
                        variant='outlined'
                        size='small'
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        multiline
                        rows={4}
                    />
                    <TextField
                        id='outlined-basic'
                        label='Project Tech Stack'
                        variant='outlined'
                        size='small'
                        value={projectTechStack}
                        onChange={(e) => setProjectTechStack(e.target.value)}
                    />
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        MenuProps={MenuProps}
                        placeholder='Skills'
                        label='Skills'
                    >
                        {availableSkills.map((skill) => (
                            <MenuItem key={skill._id} value={skill.skillName}>
                                {skill.skillName}
                            </MenuItem>
                        ))}
                    </Select>

                    <button className="btn btn-primary" style={{
                        width: '100px',
                        alignSelf: 'center'
                    }} onClick={async () => {
                        await Axios.post('http://localhost:3000/projects', {
                            projectName,
                            projectDescription,
                            projectTechStack,
                            skills
                        }, {
                            headers: {
                                'authorization': localStorage.getItem('token')
                            }
                        })
                            .then(({ data }) => {
                                if (data.status == 200) {
                                    toast.success(data.message, {
                                        position: "top-center",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark",
                                    });
                                    getProjects()
                                    setShowAddModal(false)
                                    setProjectName('')
                                    setProjectDescription('')
                                    setProjectTechStack('')
                                    setSkills([])
                                }
                                else {
                                    toast.error(data.message, {
                                        position: "top-center",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark",
                                    });
                                }
                            }
                            )
                            .catch((err) => {
                                toast.error(err, {
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                });
                            }
                            )
                    }}>Add</button>
                </div>
            </Modal>
            <Modal
                open={showEditModal}
                onClose={() => setShowEditModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: '35%',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <h1 style={{
                        textAlign: 'center',
                        fontSize: '30px',
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        margin: '20px 0'
                    }}
                    >Edit Project</h1>
                    <TextField
                        id='outlined-basic'
                        label='Project Name'
                        variant='outlined'
                        size='small'
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <TextField
                        id='outlined-basic'
                        label='Project Description'
                        variant='outlined'
                        size='small'
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        multiline
                        rows={4}
                    />
                    <TextField
                        id='outlined-basic'
                        label='Project Tech Stack'
                        variant='outlined'
                        size='small'
                        value={projectTechStack}
                        onChange={(e) => setProjectTechStack(e.target.value)}
                    />
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        MenuProps={MenuProps}
                        placeholder='Skills'
                        label='Skills'
                    >
                        {availableSkills.map((skill) => (
                            <MenuItem key={skill._id} value={skill.skillName}>
                                {skill.skillName}
                            </MenuItem>
                        ))}
                    </Select>

                    <button className="btn btn-primary" style={{
                        width: '100px',
                        alignSelf: 'center'
                    }} onClick={async () => {
                        await Axios.put(`http://localhost:3000/projects/${editId}`, {
                            projectName,
                            projectDescription,
                            projectTechStack,
                            skills
                        }, {
                            headers: {
                                'authorization': localStorage.getItem('token')
                            }
                        })
                            .then(({ data }) => {
                                if (data.status == 200) {
                                    toast.success(data.message, {
                                        position: "top-center",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark",
                                    });
                                    getProjects()
                                    setShowEditModal(false)
                                    setProjectName('')
                                    setProjectDescription('')
                                    setProjectTechStack('')
                                    setSkills([])
                                }
                                else {
                                    toast.error(data.message, {
                                        position: "top-center",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark",
                                    });
                                }
                            }
                            )
                            .catch((err) => {
                                toast.error(err, {
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                });
                            }
                            )
                    }
                    }>Edit</button>
                </div>
            </Modal>
        </div>
    )
}

export default Projects
