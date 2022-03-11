import { useContext } from 'react';
import classes from './AuthForm.module.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { AuthContext } from '../../shared/context/auth-context';


const AuthForm = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [number, setNumber] = useState("")
  const [experience, setExperience] = useState("")


  const switchModeHandler = () => {
    setIsLoginMode(prevMode => !prevMode);
  };

  const Register = async event => {
    event.preventDefault();

    if (!isLoginMode) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URLS}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            password,
            email,
            number,
            age,
            experience
          })
        });
        const responseData = await response.json()
        switchModeHandler()

        if (!response.ok) {
          throw new Error(responseData.message)
        }
      } catch (err) { }
    } else {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URLS}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
        const data = await response.json()

        auth.login(data.userId, data.token)
        if (data.userId) {
          localStorage.setItem('token', data.userId)
          navigate('/')
        } else {
          alert('Please check your username and password')
        }
      } catch (err) { }
    }
  };



  return (
    <React.Fragment>
      <section className={classes.page}>
        <div className={classes.auth}>
          <Form onSubmit={Register}>
            <h1>{isLoginMode ? 'Login' : 'SignUp'}</h1>
            {!isLoginMode && (
              <Form.Group >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  type='text'
                  onChange={(e) => setName(e.target.value)}
                  required />
              </Form.Group>
            )}
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </Form.Group>
            <Form.Group >
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                required />
            </Form.Group>
            {!isLoginMode && (
              <div>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type='text'
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required />
                </Form.Group>
                <Form.Group >
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    value={experience}
                    type='text'
                    onChange={(e) => setExperience(e.target.value)}
                    required />
                </Form.Group>
                <Form.Group >
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    value={age}
                    type='Number'
                    onChange={(e) => setAge(e.target.value)}
                    required />
                </Form.Group>
              </div>
            )}
            <div className={classes.actions}>
              <button type="submit" >
                {isLoginMode ? 'LOGIN' : 'SIGNUP'}
              </button>
            </div>
          </Form>
          <div className={classes.actions}>
            <button onClick={switchModeHandler}>
              SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
            </button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AuthForm;