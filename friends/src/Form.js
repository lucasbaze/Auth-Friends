import React from 'react';

import { Form, Container } from 'semantic-ui-react';
import { useForm } from './hooks/useForm';
import { axiosWithAuth } from './hooks';

const LoginForm = ({ history, setIsLoading }) => {
    const submitHandler = formValues => {
        setIsLoading(true);
        let credentials = { ...formValues };
        axiosWithAuth()
            .post('/login', credentials)
            .then(res => {
                if (res.status == '200') {
                    localStorage.setItem('token', res.data.payload);
                }
                history.push('/friends');
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    };

    const [formValues, handleChange, handleSubmit] = useForm(
        { username: '', password: '' },
        submitHandler
    );

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label htmlFor="username">UserName</label>
                    <input
                        name="username"
                        type="text"
                        value={formValues.username}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Button type="submit" color="red" content="Login" />
            </Form>
        </Container>
    );
};

export default LoginForm;
