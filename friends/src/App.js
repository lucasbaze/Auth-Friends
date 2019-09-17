import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { Menu, Button, Loader, Container } from 'semantic-ui-react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

import Form from './Form';
import Friends from './Friends';

function App() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <BrowserRouter>
            <Menu>
                <Menu.Item as={Link} to="/">
                    Home
                </Menu.Item>
                <Menu.Item as={Link} to="/friends">
                    Friends
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item as={Link} to="/login">
                        <Button color="red">
                            {' '}
                            {isLoading ? (
                                <Loader active inline inverted size="tiny" />
                            ) : (
                                'Login'
                            )}{' '}
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Switch>
                <PrivateRoute path="/friends" component={Friends} />
                <Route
                    path="/login"
                    render={props => (
                        <Form {...props} setIsLoading={setIsLoading} />
                    )}
                />
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    );
}

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('token') ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

function Home(props) {
    return (
        <Container>
            <h1>Home</h1>
        </Container>
    );
}

export default App;
