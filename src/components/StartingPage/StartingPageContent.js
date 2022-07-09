import React, { useState, useEffect, useCallback } from "react";
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { useContext } from "react"
import { AuthContext } from '../../shared/context/auth-context';
import { Link } from 'react-router-dom';
import classes from './StartingPageContent.module.css'
import Card from './Card'
import List from "./List";




const HomePage = () => {
    const auth = useContext(AuthContext)
    const [show, setShow] = useState(false);
    const [job, setJob] = useState([])
    const [info, setInfo] = useState([])
    const [user, setUser] = useState([])
    const [what, setWhat] = useState('')
    const [app, setApp] = useState([])

    const jobId = useParams().id;
    const userId = auth.userId;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        const fetchjob = async () => {
            try {
                const req = await fetch(
                    `${process.env.REACT_APP_BACKEND_URLS}/jobs`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
                )
                const data = await req.json();
                setJob(data.jobs)
            } catch (err) {
                console.log(err)
            }
        }
        fetchjob();
        filterJobs(what)
    }, []);


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
                setInfo(data.job)
                if (!req.ok) {
                    throw new Error(req.message)
                }
            } catch (err) { }
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
                alert('successfully Applied, may take time to save')
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
                setApp(data.users.applied)

                if (!req.ok) {
                    throw new Error(req.message)
                }
            } catch (err) { }
        }
        fetchUser()
    }, [userId, Apply]);

    const jobInfo = job.map(job =>
        <Card
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            location={job.location}
            type={job.type}
            description={job.description}
        />)



    const appInfo = app.map(({ title, salary, location }) => {
        return <List
            key={Math.random()}
            title={title}
            salary={salary}
            location={location} />
    })

    const filterJobs = (what) => {
        let filteredData = []
        for (let i = 0; i < jobInfo.length; i++) {
            what = what.toLowerCase()
            const name = jobInfo[i].props.title.toLowerCase()

            if (name.includes(what)) {
                filteredData.push(jobInfo[i].props)
                setJob(filteredData)
            }
        }
    }


    const onFilter = (event) => {
        event.preventDefault()
        filterJobs(what)
    }



    return (
        <section className={classes.background}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Applied To</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {appInfo || 'No jobs applied to'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={classes.search}>
                <form onSubmit={onFilter}>
                    <div className={classes.inside}>
                        <div className={classes.filter}>
                            <label htmlFor='what'>What</label>
                            <input
                                id='What'
                                className={classes.inputs}
                                value={what}
                                onChange={(e) => setWhat(e.target.value)}
                                placeholder='Job title or Keywords'
                            />
                        </div>
                        <div>
                            <Button>Filter jobs</Button>
                        </div>
                    </div>
                </form>
            </div>
            {auth.isLoggedIn && (
                <div className={classes.buttons}>
                    <Button onClick={handleShow}>My Jobs</Button>
                </div>
            )}
            <div className={classes.cards}>
                <div>
                    {jobInfo}
                </div>
                <div className={classes.card2}>
                    <div className={classes.sections}>
                        <h3>{info.title || 'Select a job'}</h3>
                        <h5>{info.location}</h5>
                        {auth.isLoggedIn && (
                            <Button onClick={Apply}>Apply Now</Button>
                        )}
                        {!auth.isLoggedIn && (
                            <Link to='/auth'>
                                <Button>Apply Now</Button>
                            </Link>
                        )}
                    </div>
                    <div className={classes.sections}>
                        <h3>Job Details</h3>
                        <h6>Salary</h6>
                        <p>{info.salary || 'Searching...'}</p>
                        <h6>Job Type</h6>
                        <p>{info.type || 'Searching...'}</p>
                    </div>
                    <div className={classes.sections}>
                        <h2>Qualifications</h2>
                        <p>
                            {info.qualifications || 'Searching...'}
                        </p>
                    </div>
                    <div>
                        <h2>Full Job Description</h2>
                        <p>
                            {info.description || 'Searching...'}
                        </p>
                    </div>
                </div>
            </div>
        </section >
    )

}

export default HomePage