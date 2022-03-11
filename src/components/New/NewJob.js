import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './NewJob.module.css'
import { Form } from 'react-bootstrap';
import { AuthContext } from '../../shared/context/auth-context';

const NewJob = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [salary, setSalary] = useState("")
    const [type, setType] = useState("")
    const [qualifications, setQualifications] = useState("")
    const [description, setDescription] = useState("")
    const userId = auth.userId;


    const JobPost = async (event) => {
        try {
            event.preventDefault()
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URLS}/job`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    location,
                    salary,
                    type,
                    qualifications,
                    description,
                    creator: userId
                }),
            });
            const responseData = await response.json()
            navigate('/')


            if (!response.ok) {
                throw new Error(responseData.message)
            }
        } catch (err) { }
    }

    return (
        <section className={classes.page} >
            <div className={classes.auth}>
                <h1>Post Job</h1>
                <Form onSubmit={JobPost}>
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


export default NewJob