import classes from './JobDetail.module.css'
import { useState, useEffect, useContext, useCallback } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import { Button, Modal } from 'react-bootstrap';
import DetailList from './DetailList';

const JobDetails = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [info, setInfo] = useState([])
    const [show, setShow] = useState(false);
    const [app, setApp] = useState([])
    const [user, setUser] = useState([])

    const jobId = useParams().id;
    const userId = auth.userId;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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
                setInfo(data.job);
                setApp(data.job.applicant);
                if (!req.ok) {
                    throw new Error(req.message)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchInfo()
    }, [jobId]);

    const Apply = useCallback(async () => {
        let name = user.name
        let email = user.email
        let age = user.age
        let number = user.number
        let experience = user.experience
        try {
            const req = await fetch(`${process.env.REACT_APP_BACKEND_URLS}/job/${jobId}/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    age,
                    number,
                    experience
                }),
            })
            if (req.ok) {
                alert('successfully Applied, may take time save')
            }
            if (!req.ok) {
                alert('something went wrong or you already applied')
                throw new Error(req.message)
            }
        } catch (err) { }
    }, [jobId, user.age, user.email, user.experience, user.name, user.number])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const req = await fetch(`${process.env.REACT_APP_BACKEND_URLS}/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await req.json();
                setUser(data.users)
                if (!req.ok) {
                    throw new Error(req.message)
                }
            } catch (err) { }
        }
        fetchUser()
    }, [userId]);

    const deleteJob = async () => {
        try {
            const req = await fetch(`${process.env.REACT_APP_BACKEND_URLS}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }, body: JSON.stringify({
                    name: info.title
                }),
            });
            navigate('/')
            if (!req.ok) {
                throw new Error(req.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const appInfo = app.map(({ name, number, email, age, experience }) => {
        return <DetailList
            key={Math.random()}
            name={name}
            number={number}
            email={email}
            age={age}
            experience={experience}
        />
    })

    return (
        <section className={classes.page}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Applicants</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {appInfo}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={classes.parent}>
                <div className={classes.sections}>
                    <h1>{info.title || 'Searching'}</h1>
                    <h5>{info.location}</h5>
                    {auth.isLoggedIn && (
                        <Button onClick={Apply}>Apply Now</Button>
                    )}
                    {!auth.isLoggedIn && (
                        <Link to='/auth'>
                            <Button>Apply Now</Button>
                        </Link>
                    )}
                    {auth.userId === info.creator && (
                        <div>
                            <Link to={`/details/edit/${jobId}`}>
                                <Button variant='info'>Update</Button>
                            </Link>
                            <Button variant='danger' onClick={deleteJob}>Delete</Button>
                            <Button variant='primary' onClick={handleShow}>Applicants</Button>
                        </div>
                    )}
                </div>
                <div className={classes.sections}>
                    <h3>Job Details</h3>
                    <h6>Salary</h6>
                    <p>{info.salary || 'Searching'}</p>
                    <h6>Job Type</h6>
                    <p>{info.type || 'Searching'}</p>
                </div>
                <div className={classes.sections}>
                    <h2>Qualifications</h2>
                    <p>
                        {info.qualifications || 'Searching'}
                    </p>
                </div>
                <div className={classes.section}>
                    <h2>Full Job Description</h2>
                    <p>
                        {info.description || 'Searching'}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default JobDetails