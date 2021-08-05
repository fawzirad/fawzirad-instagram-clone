import React, { useState , useContext } from 'react';
import "./Navbar.css";
import { AiFillHome } from 'react-icons/ai';
import { Button, Input, makeStyles, Modal } from "@material-ui/core";
import { ProfileBurger } from "../ProfileBurger/ProfileBurger";
import { auth } from "../../firebase";
import { AuthContext } from '../../context/auth-context';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

// Fonctions pour NavBar
const Navbar = () => {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const {user} = useContext(AuthContext)

    // function signIn event
    const signIn = (event) => {
        event.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));
        setOpenSignIn(false);
    };

    // function signUp event
    const signUp = (event) => {
        event.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                });
            })
            .catch((error) => alert(error.message));
        setOpen(false);
    };

    return (
        <>
            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                    alt="instagram"
                />
                <div className="menu_nav" >
                    <Button>
                        <AiFillHome style={{ fontSize: "20px" }} />
                    </Button>

                    {user ? (
                        <ProfileBurger />
                    ) : (
                        <div className="app__loginContainer">
                            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                            <Button onClick={() => setOpen(true)}>Sign Up</Button>
                        </div>
                    )}
                </div>

            </div>
            <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__signup">
                        <center>
                            <img
                                className="app__headerImage"
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                                alt="instagram"
                            />
                        </center>
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    <Button type="submit" onClick={signIn}>
                            Sign In
                        </Button>
                    </form>
                </div>
            </Modal>

            <Modal open={open} onClose={() => setOpen(false)}>
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__signup">
                        <center>
                            <img
                                className="app__headerImage"
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                                alt="instagram"
                            />
                        </center>
                        <Input
                            placeholder="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signUp}>
                            Sign Up
                        </Button>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default Navbar
