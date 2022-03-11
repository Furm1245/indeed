import { useContext } from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import classes from './EditDetails.module.css'
import { Form } from 'react-bootstrap';
import { AuthContext } from '../../shared/context/auth-context';

const EditDetails = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [salary, setSalary] = useState("")
    const [type, setType] = useState("")
    const [qualifications, setQualifications] = useState("")
    const [description, setDescription] = useState("")
    const jobId = useParams().id;

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const req = await fetch(`${process.env.REACT_APP_BACKEND_URLS}/job/${jobId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await req.json();
                setTitle(data.job.title)
                setLocation(data.job.location)
                setSalary(data.job.salary)
                setType(data.job.type)
                setQualifications(data.job.qualifications)
                setDescription(data.job.description)
                if (!req.ok) {
                    throw new Error(req.message)
                }
            } catch (err) { }
        }
        fetchInfo()
    }, [jobId]);


    const editJob = async (event) => {
        event.preventDefault()
        try {
            const req = await fetch(`${process.env.REACT_APP_BACKEND_URLS}/job/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                },
                body: JSON.stringify({
                    title,
                    location,
                    salary,
                    type,
                    qualifications,
                    description
                }),
            })
            navigate(`/details/${jobId}`)
            if (!req.ok) {
                throw new Error(req.message)
            }
        } catch (err) {
            console.log(err)
        }
    }






    return (
        <section className={classes.page} >
            <div className={classes.auth}>
                <h1>Edit Job</h1>
                <Form onSubmit={editJob}>
                    <Form.Group className={classes.control} >
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                            value={title}
                            type='text'
                            onChange={(e) => setTitle(e.target.value)}
                            required />
                    </Form.Group>
                    <Form.Group className={classes.control}>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            value={location}
                            type='text'
                            onChange={(e) => setLocation(e.target.value)}
                            required />
                    </Form.Group>
                    <Form.Group className={classes.control}>
                        <Form.Label>Salary</Form.Label>
                        <Form.Control
                            value={salary}
                            type='text'
                            onChange={(e) => setSalary(e.target.value)}
                            required />
                    </Form.Group>
                    <Form.Group className={classes.control}>
                        <Form.Label>Job Type</Form.Label>
                        <Form.Control
                            value={type}
                            type='text'
                            onChange={(e) => setType(e.target.value)}
                            required />
                    </Form.Group>
                    <Form.Group className={classes.control}>
                        <Form.Label>Qualifications</Form.Label>
                        <Form.Control
                            value={qualifications}
                            as="textarea"
                            onChange={(e) => setQualifications(e.target.value)}
                            required />
                    </Form.Group>
                    <Form.Group className={classes.control}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={description}
                            as="textarea"
                            onChange={(e) => setDescription(e.target.value)}
                            required />
                    </Form.Group>
                    <div className={classes.actions}>
                        <button>Submit</button>
                    </div>
                </Form>
            </div>
        </section >
    )
}


export default EditDetails