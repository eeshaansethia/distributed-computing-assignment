import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import Axios from 'axios'
import { Modal, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const Skills = () => {
    const [skills, setSkills] = useState([])
    const [search, setSearch] = useState('')
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [skillName, setSkillName] = useState('')
    const [skillDescription, setSkillDescription] = useState('')
    const [skillId, setSkillId] = useState('')
    const navigate = useNavigate()

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
                    setSkills(data.data)
                }
            }).catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        getSkills()
    }, [])

    const deleteSkill = async (id) => {
        await Axios.delete(`http://localhost:3000/skills/${id}`, {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then(({ data }) => {
                if (data.status == 200) {
                    getSkills()
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    const columns = [
        {
            name: 'Skill Name',
            selector: 'skillName',
            sortable: true
        },
        {
            name: 'Skill Description',
            selector: 'skillDescription',
            sortable: true
        },
        {
            name: 'Actions',
            cell: row => (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <button className="btn btn-primary" onClick={() => {
                        setShowEditModal(true)
                        setSkillName(row.skillName)
                        setSkillDescription(row.skillDescription)
                        setSkillId(row._id)
                    }}>Edit</button>
                    <button className="btn btn-danger" onClick={() => deleteSkill(row._id)}>Delete</button>
                </div>
            )
        }
    ]
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
                        >Skills</h1>
                        <DataTable
                            columns={columns}
                            data={skills.filter((skill) => {
                                if (search == '') {
                                    return skill
                                } else if (skill.skillName.toLowerCase().includes(search.toLowerCase())) {
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
                                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add Skill</button>
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

            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: '40%',
                    backgroundColor: 'white',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    borderRadius: '5px'
                }}>
                    <h1 style={{
                        textAlign: 'center',
                        fontSize: '30px',
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        margin: '20px 0'
                    }}
                    >Add New Skill</h1>

                    <TextField
                        id='outlined-basic'
                        label='Skill Name'
                        variant='outlined'
                        style={{
                            margin: '5px'
                        }}
                        size='small'
                        value={skillName}
                        onChange={(e) => setSkillName(e.target.value)}
                        required
                    />
                    <TextField
                        id='outlined-basic'
                        label='Skill Description'
                        variant='outlined'
                        style={{
                            margin: '5px'
                        }}
                        size='small'
                        multiline
                        rows={4}
                        value={skillDescription}
                        onChange={(e) => setSkillDescription(e.target.value)}
                        required
                    />
                    <button
                        className="btn btn-primary"
                        style={{
                            width: '30%',
                            margin: 'auto'
                        }}
                        onClick={async () => {
                            if (skillName == '' || skillDescription == '') {
                                toast('Please fill all the fields!', {
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                });
                                return
                            }
                            await Axios.post('http://localhost:3000/skills', {
                                skillName,
                                skillDescription
                            }, {
                                headers: {
                                    'authorization': localStorage.getItem('token')
                                }
                            }).then(({ data }) => {
                                setSkillName('')
                                setSkillDescription('')
                                if (data.status == 200) {
                                    setShowAddModal(false)
                                    getSkills()
                                    toast('Skill added successfully!', {
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
                                else {
                                    toast(data.message, {
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
                            }).catch((error) => {
                                console.log(error)
                            })
                        }}>Add Skill</button>
                </div>
            </Modal>
            <Modal
                open={showEditModal}
                onClose={() => setShowEditModal(false)}

            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: '40%',
                    backgroundColor: 'white',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    borderRadius: '5px'
                }}>
                    <h1 style={{
                        textAlign: 'center',
                        fontSize: '30px',
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        margin: '20px 0'
                    }}
                    >Edit Skill</h1>

                    <TextField
                        id='outlined-basic'
                        label='Skill Name'
                        variant='outlined'
                        style={{
                            margin: '5px'
                        }}
                        size='small'
                        value={skillName}
                        onChange={(e) => setSkillName(e.target.value)}
                        required
                    />
                    <TextField
                        id='outlined-basic'
                        label='Skill Description'
                        variant='outlined'
                        style={{
                            margin: '5px'
                        }}
                        size='small'
                        multiline
                        rows={4}
                        value={skillDescription}
                        onChange={(e) => setSkillDescription(e.target.value)}
                        required
                    />
                    <button
                        className="btn btn-primary"
                        style={{
                            width: '30%',
                            margin: 'auto'
                        }}
                        onClick={async () => {
                            if (skillName == '' || skillDescription == '') {
                                toast('Please fill all the fields!', {
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                });
                                return
                            }
                            await Axios.put(`http://localhost:3000/skills/${skillId}`, {
                                skillName,
                                skillDescription
                            }, {
                                headers: {
                                    'authorization': localStorage.getItem('token')
                                }
                            }).then(({ data }) => {
                                setSkillName('')
                                setSkillDescription('')
                                setSkillId('')
                                if (data.status == 200) {
                                    setShowEditModal(false)
                                    getSkills()
                                    toast('Skill updated successfully!', {
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
                                else {
                                    toast(data.message, {
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
                            ).catch((error) => {
                                console.log(error)
                            })
                        }
                        }>Edit Skill</button>
                </div>
            </Modal>
        </div>
    )
}

export default Skills
