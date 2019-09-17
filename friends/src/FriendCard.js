import React, { useState, useEffect } from 'react';

import { Card, Button } from 'semantic-ui-react';

const FriendCard = ({ friend, handleDelete, handleEdit, handleSave }) => {
    return (
        <Card>
            <Card.Content header={friend.name} />
            <Card.Content meta={friend.age} />
            <Card.Content description={friend.email} />
            <Card.Content extra>
                <Button
                    basic
                    icon="delete"
                    onClick={() => handleDelete(friend.id)}
                />
                <Button basic onClick={() => handleEdit(friend.id)}>
                    Edit
                </Button>
            </Card.Content>
        </Card>
    );
};

export default FriendCard;
