import React, { useEffect } from 'react';
import { Alert, Button, Card, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import styles from './Profile.module.css';
import axios from 'axios';
import * as actionTypes from '../../store/action';
import { useHistory } from 'react-router-dom';

function Profile(props) {
  const history = useHistory();
  const [show, setShow] = React.useState(false);
  const [pwd, setPwd] = React.useState({
    oldPwd: "",
    newPwd: "",
    confirmPwd: "",
  })
  const [alert, setAlert] = React.useState({
    status: false,
    type: "",
    msg: ""
  })
  const [info, setInfo] = React.useState({
    firstname: props.firstname,
    lastname: props.lastname,
    email: props.email,
    password: props.password
  })
  const [editing, setEditing] = React.useState(false);

  useEffect(() => {
    if (props.firstname === "" && props.lastname === "") {
      axios.get(`http://localhost:8080/authorization/user/` + props.email)
        .then(response => {
          console.log(response.data)
          props.onGetName(response.data.first_name, response.data.last_name, response.data.password);
        }).catch(err => {
          setAlert({
            status: true,
            type: "danger",
            msg: err.response.data.message
          })
        })
    }
  })

  const deleteUser = () => {
    axios.delete(`http://localhost:8080/authorization/user/` + props.email)
      .then(response => {
        props.onDelete();
        history.push("/");
      }).catch(err => {
        setAlert({
          status: true,
          type: "danger",
          msg: err.response.data.message
        })
      })
  }

  const infoChange = (event) => {
    setInfo({
      ...info,
      [event.target.id]: event.target.value
    })
  }

  const submitChange = event => {
    console.log(info)
    axios.put(`http://localhost:8080/authorization/user/` + props.email, {
      first_name: info.firstname,
      last_name: info.lastname,
      password: info.password
    })
      .then(response => {
        setAlert({
          status: true,
          type: "success",
          msg: response.data.message
        })
        setEditing(false);
        
        props.onUpdate(info.firstname, info.lastname);
      }).catch(err => {
        setAlert({
          status: true,
          type: "danger",
          msg: err.response.data.message
        })
      })
  }

  const changePwd = event => {
    if (pwd.newPwd === pwd.confirmPwd) {
      axios.post(`http://localhost:8080/authorization/change-password/`,
        {
          email: props.email,
          old_password: pwd.oldPwd,
          new_password: pwd.newPwd,
          confirm_password: pwd.confirmPwd 
        })
        .then(response => {
          setAlert({
            status: true,
            type: "success",
            msg: response.data.message
          })
          props.onPwdChange(pwd.newPwd);
        }).catch(err => {
          setAlert({
            status: true,
            type: "danger",
            msg: err.response.data.message
          })
        })
    }
  }

  const handlePwdChange = event => {
    setPwd({
      ...pwd,
      [event.target.id]: event.target.value,
    })
  }

  const logout = () => {
    props.onLogout();
    history.push('/');
  }

  return (
    <div>
      {alert.status === true ? <Alert variant={alert.type} className={styles.alert} onClose={() => setAlert({ status: false, msg: "" })} dismissible>
        <Alert.Heading>{alert.msg}</Alert.Heading>
        <p>
          
        </p>
      </Alert> : <div></div>}
      <Card className={styles.card} >
        <Card.Body>
          <Card.Title>{props.fullname}</Card.Title>
          <Card.Text>
            Firstname: {editing ? <Form.Control id="firstname" defaultValue={props.firstname} onChange={infoChange} /> : props.firstname}
          </Card.Text>
          <Card.Text>
            Lastname: {editing ? <Form.Control id="lastname" defaultValue={props.lastname} onChange={infoChange} /> : props.lastname}
          </Card.Text>
          <Card.Text>
            E-mail: {editing ? <Form.Control disabled id="email" defaultValue={props.email} /> : props.email}
          </Card.Text>
          <Button variant="outline-primary" className={styles.btn} onClick={() => setShow(true)}>Change Password</Button>

          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Change Password:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label sm="3"  >Current Password:</Form.Label>
              <br />
              <Form.Control id="oldPwd" type="text" className={styles.input} onChange={handlePwdChange} />
              <Form.Label>New Password:</Form.Label>
              <br />
              <Form.Control id="newPwd" column sm="3" type="password" className={styles.input} onChange={handlePwdChange} />
              <Form.Label>Confirm Password:</Form.Label>
              <br />
              <Form.Control id="confirmPwd" column sm="3" type="password" className={styles.input} onChange={handlePwdChange} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)} >
                Close
              </Button>
              <Button variant="primary" onClick={changePwd} >
                Change Password
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
        <Card.Footer>
          <Button variant="outline-secondary" className={styles.btn} onClick={editing ? () => setEditing(false) : () => setEditing(true)}>{editing ? "Back" : "Edit Profile"}</Button>
          <Button variant={editing ? "outline-success" : "outline-danger"} onClick={editing ? submitChange : deleteUser} className={styles.btnDisable}>{editing ? "Save Changes" : "Delete Account"}</Button>
          <Button variant="outline-secondary" className={styles.btnLogout}  onClick={logout}>Logout</Button>
        </Card.Footer>
      </Card>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    email: state.email,
    firstname: state.firstname,
    lastname: state.lastname,
    password: state.password
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetName: (f, l, p) => dispatch({ type: actionTypes.GET_NAME, getFirstname: f, getLastname: l, getPassword: p }),
    onDelete: () => dispatch({ type: actionTypes.DELETE_USER }),
    onUpdate: (f, l) => dispatch({ type: actionTypes.UPDATE_USER, getFirstname: f, getLastname: l }),
    onPwdChange: (p) => dispatch({ type: actionTypes.UPDATE_PWD, getPassword: p }),
    onLogout: () => dispatch({type: actionTypes.LOGOUT})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)