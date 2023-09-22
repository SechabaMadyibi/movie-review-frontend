import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const Login = props => {

//     We set the initial name and id to be empty strings (“”). Our simple login form consists of a username and
// id fields. The onChangeName and onChangeId methods bind the field values to the name and id state variables.
// They work in a similar fashion to the form we have earlier implemented in MoviesList, so I won’t explain
// further.

    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const onChangeName = e => {
        const name = e.target.value
        setName(name);
    }
    const onChangeId = e => {
        const id = e.target.value
        setId(id);
    }
    const login = () => {
        props.login({ name: name, id: id })
        props.history.push('/')
    }
    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={name}
                        onChange={onChangeName}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter id"
                        value={id}
                        onChange={onChangeId}
                    />
                </Form.Group>
                <Button variant="primary" onClick={login}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}
export default Login;