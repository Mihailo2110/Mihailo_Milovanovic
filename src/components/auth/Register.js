import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import styles from './Login.module.css';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';


function Register(props) {
    const history = useHistory();
    const [credential, setCredential] = React.useState({
        password: "",
        firstname: "",
        lastname: "",
        email: "",
    })
    const [show, setShow] = React.useState({
        status: false,
        msg: "",
        type: "err"
    });

    const onCredChange = (event) => {
        if(event.target.id !== "confirmpassword"){
            setCredential({...credential,
                [event.target.id]: event.target.value});
        }

    }

    const onRegister = () => {
        axios.post(`http://localhost:8080/authorization/user`, {first_name: credential.firstname, 
            last_name: credential.lastname, email: credential.email, password: credential.password })
        .then(response => {
            setShow({
                status: true,
                msg: response.data.message,
                type: "success"
            })
            history.push("/");
        }).catch(err => {
            setShow({
                status: true,
                msg: err.response.data.message,
                type: "err"
            })
        })
    }

    return (
        <div>
            {show.status === true ? <Alert variant={show.type === "err" ? "danger" : "success"} className={styles.alert} onClose={() => setShow({status: false, msg:""})} dismissible>
                <Alert.Heading>{show.type === "err" ? "Oh snap! You got an error!" : "Everything ready! You can login now!"}</Alert.Heading>
                <p>
                    {show.msg}
                </p>
            </Alert> : <div></div>}
            <Form className={styles.form}>
                <Form.Group>
                    <Form.Label> First Name:</Form.Label>
                    <br />
                    <Form.Control id="firstname" type="text" className={styles.input} onChange={onCredChange} />
                    <Form.Label> Last Name:</Form.Label>
                    <br />
                    <Form.Control id="lastname" type="text" className={styles.input} onChange={onCredChange} />
                    <Form.Label> E-mail:</Form.Label>
                    <br />
                    <Form.Control id="email" type="email" className={styles.input} onChange={onCredChange} />
                    <Form.Label> Password:</Form.Label>
                    <br />
                    <Form.Control id="password" column sm="3" type="password" className={styles.input} onChange={onCredChange} />
                    <Form.Label>Confirm Password:</Form.Label>
                    <br />
                    <Form.Control id="confirmpassword" column sm="3" type="password" className={styles.input} onChange={onCredChange} />
                    <br />
                    <p>Already have Account? Click <a href="/">here</a> to login</p>
                </Form.Group>
                <Form.Group className={styles.btnGrp}>
                    <Button variant="secondary" className={styles.btnLogin} onClick={ onRegister } >Register</Button>
                </Form.Group>
            </Form>
        </div>
    );
}
const mapDispatchToProps = dispatch => {
    return {
        onReg: (f, l, e) => dispatch({ })
    }
}

export default connect(null, mapDispatchToProps)(Register);
