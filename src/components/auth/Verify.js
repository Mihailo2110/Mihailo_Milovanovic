import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import styles from './Verify.module.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Verify(props) {
    const history = useHistory();
    const [verify, setVerify] = React.useState("");

    const ver = (event) => {
        setVerify(event.target.value);
    }

    const auth = () => {
        console.log(verify+ " " + props.email)
        axios.post(`http://localhost:8080/authorization/check-token`, { token: verify, email: props.email})
        .then(response => {
            console.log(response)
            //props.onLogIn()
            history.push("/home")
        }).catch(err => {
            history.push("/")
        })
    }

    return (
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
    );
}

const mapStateToProps = state => {
    return{
        email: state.email,
    }
}


export default connect(mapStateToProps)(Verify)