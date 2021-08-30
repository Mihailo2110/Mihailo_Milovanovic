import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import styles from './Login.module.css';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actionTypes from '../../store/action';
import { propTypes } from 'react-bootstrap/esm/Image';


function Login(props) {
    const history = useHistory();
    const [credential, setCredential] = React.useState({
        email: "",
        password: ""
    })
    const [show, setShow] = React.useState({
        status: false,
        msg: ""
    });

    const onCredChange = (event) => {
        if (event.target.id === "username") {
            setCredential({
                email: event.target.value,
                password: credential.password
            })
        }
        if (event.target.id === "password") {
            setCredential({
                email: credential.email,
                password: event.target.value
            })
        }
    }

    const onLogin = (event) => {
        console.log(credential);
            axios.post(`http://localhost:8080/authorization/login`, { email: credential.email, password: credential.password })
            .then(response => {
                console.log(response)
                setShow({
                    status: true,
                    msg: "Account created!",
                    type: "success"
                })
                props.onLogIn(credential.email);
                history.push("/verify");
            }).catch(err => {
                console.log(err.message);
                setShow({
                    status: true,
                    msg: err.response.data.message,
                    type: "err"
                })
            })
    }

    return (
        <div>
            {show.status === true ? <Alert variant="danger" className={styles.alert} onClose={() => setShow({status: false, msg:""})} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    {show.msg}
                </p>
            </Alert> : <div></div>}
            <Form className={styles.form}>
                <Form.Group>
                    <Form.Label column sm="3" >Username:</Form.Label>
                    <br />
                    <Form.Control id="username" type="text" className={styles.input} onChange={onCredChange} />
                    <Form.Label>Password:</Form.Label>
                    <br />
                    <Form.Control id="password" column sm="3" type="password" className={styles.input} onChange={onCredChange} />
                </Form.Group>
                <Form.Group className={styles.btnGrp}>
                    <Button className={styles.btnLogin} onClick={onLogin}>Login</Button>
                    <Button variant="secondary" href="/register" style={{ float: 'right' }}>Register</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onLogIn: (e) => dispatch({type: actionTypes.LOG_IN, getEmail: e })
    }
}

export default connect(null, mapDispatchToProps)(Login);