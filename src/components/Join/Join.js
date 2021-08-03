import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiSnapchatLine } from 'react-icons/ri';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export const useStyles = makeStyles({
    joinInput: {
        width: "250px",
        margin: "20px",
    },
    joinOuterContainer: {
        backgroundColor: "#1877f2",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    joinInnerContainer: {
        border: "2px solid grey",
        borderRadius: "10px",
        padding: "90px",
        backgroundColor: "white"

    },
    joinButton: {
        backgroundColor: "#1877f2",
        border: "none",
        padding: "16px",
        width: "50%",
        color: "white",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: "pointer"
    },
    Logo: {
        width: "100px",
        height: "100px",
        color: "black"
    },
    heading: {
        fontSize: "larger",
        fontWeight: "bold",
        marginBottom: "10px"
    }
})
export const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const classes = useStyles();
    return (
        <div className={classes.joinOuterContainer}>
            <div className={classes.joinInnerContainer}>
                <div className={classes.heading}>
                    <span ><RiSnapchatLine className={classes.Logo} /></span>
                    <div className={classes.heading}>Welcome To Chat Room</div>
                    <div><TextField margin="dense" label="Enter Name" required size="medium" className={classes.joinInput} variant="outlined" onChange={(e) => setName(e.target.value)} /></div>
                    <div><TextField margin="dense" label="Enter Room Name" required size="medium" className={classes.joinInput} variant="outlined" onChange={(e) => setRoom(e.target.value)} /></div>
                    <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <button className={classes.joinButton} type="submit">Sign In</button>
                    </Link>
                </div>
            </div>
        </div >
    )
}