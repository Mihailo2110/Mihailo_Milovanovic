import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import styles from './Verify.module.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Verify(props) {
    const history = useHistory();
    const [verify, setVerify] = React.useState("");

    const [show, setShow] = React.useState({
        status: false,
        msg: ""
    });

    const ver = (event) => {
        setVerify(event.target.value);
    }

    const auth = () => {
        // mihailomilovanovic21@gmail.com
        console.log(verify+ " " + props.email)
        axios.post(`http://localhost:8080/authorization/check-token`, { token: verify, email: props.email})
        .then(response => {
            console.log(response)
            //props.onLogIn()
            history.push("/home")
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
                    <h4>Two-way authentication</h4>
                    <Form.Label >4-digit code</Form.Label>
                    <br />
                    <Form.Control type="text" className={styles.input} onChange={ver} />
                </Form.Group>
                <Form.Group className={styles.btnGrp}>
                <Button variant="secondary" href="/">Back</Button>
                    <Button className={styles.btnLogin} onClick={auth} >Verify</Button>

                </Form.Group>
            </Form>
        </div>
    );
}

const mapStateToProps = state => {
    return{
        email: state.email,
    }
}


export default connect(mapStateToProps)(Verify)