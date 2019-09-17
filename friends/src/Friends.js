import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from './hooks';

import { useForm } from './hooks/useForm';

import { Card, Container, Loader, Form, Button } from 'semantic-ui-react';
import FriendCard from './FriendCard';

const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const submitHandler = formValues => {
        axiosWithAuth()
            .post('/friends', { ...formValues })
            .then(res => {
                if (res.status == 200) {
                    console.log(res.data);
                    setFriends(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const [formValues, handleChange, handleSubmit, setFormValues] = useForm(
        {
            name: '',
            age: '',
            email: '',
        },
        submitHandler
    );

    useEffect(() => {
        axiosWithAuth()
            .get('/friends')
            .then(res => {
                if (res.status == 200) {
                    setFriends(res.data);
                }
            });
    }, []);

    const handleDelete = id => {
        axiosWithAuth()
            .delete(`/friends/${id}`)
            .then(res => {
                if (res.status == 200) {
                    setFriends(res.data);
                }
            });
    };

    const handleEdit = id => {
        //set isEditing true
        setIsEditing(true);
        //find friend with id
        let index = friends.findIndex(f => f.id == id);
        //set form values to the id
        setFormValues({ ...friends[index] });
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleSave = () => {
        setIsEditing(false);
        axiosWithAuth()
            .put(`/friends/${formValues.id}`, { ...formValues })
            .then(res => {
                if (res.status == 200) {
                    setFriends(res.data);
                }
            })
            .catch(err => console.log(err));

        let setAll = (obj, val) => {
            Object.keys(obj).forEach(k => (obj[k] = val));
        };

        setAll(formValues, '');
        setFormValues({ ...formValues });
    };

    return (
        <Container>
            <h1>Friends</h1>
            <h3>Add New Friend</h3>
            <Form onSubmit={isEditing ? handleSave : handleSubmit}>
                <Form.Field>
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        type="text"
                        value={formValues.name}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="age">Age</label>
                    <input
                        name="age"
                        type="text"
                        value={formValues.age}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="text"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Button
                    type="submit"
                    color="teal"
                    content={isEditing ? 'Save Edits' : 'Add New Friend'}
                />
            </Form>
            {friends && friends.length ? (
                friends.map(friend => {
                    return (
                        <FriendCard
                            key={friend.id}
                            friend={friend}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    );
                })
            ) : (
                <Loader active />
            )}
        </Container>
    );
};

export default Friends;
