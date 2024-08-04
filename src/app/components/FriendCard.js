import React from 'react';
import { Card, CardContent, CardActions, Avatar, Typography, Button } from '@mui/material';

const FriendCard = ({ friend, onRemove }) => {
    return (
        <Card style={{ margin: '10px', display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Avatar src={friend.avatar} alt={friend.name} style={{ margin: '10px' }} />
                <CardContent style={{ flex: '1', padding: '10px', overflow: 'hidden' }}>
                    <Typography variant="h6" noWrap>{friend.name}</Typography>
                    <Typography color="textSecondary" noWrap>{friend.email}</Typography>
                </CardContent>
            </div>
            <CardActions style={{ justifyContent: 'flex-end' }}>
                <Button size="small" color="primary">Message</Button>
                <Button size="small" color="secondary" onClick={onRemove}>Remove</Button>
            </CardActions>
        </Card>
    );
};

export default FriendCard;
