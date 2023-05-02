import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import useAuth from '../services/firebase/useAuth';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import useBookings from '../services/firebase/useBooking';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '10vw',
    maxHeight: '10vh',
});

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.65),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.95),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'grey',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [booking, setBooking] = useState([]);
    const { getBooking } = useBookings();
    const [anchorElmain, setAnchorElmain] = React.useState(null);
    const [mobileMoreAnchorElmain, setMobileMoreAnchorElmain] = React.useState(null);
    const onChange = props.onChange
    const value = props.value
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { user, signUserOut, isAuthenticated } = useAuth();
    const isNotificationOpen = Boolean(anchorElmain);
    const isMobileMenuOpenmain = Boolean(mobileMoreAnchorElmain);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // useEffect(() => {
    // (event => setValue(event.target.value))
    // }, [value])
    const getBookingData = async () => {

        try {
            const bookingSnap = await getBooking();
            let booking = [];

            if (bookingSnap.size) {
                bookingSnap.forEach((doc) => {

                    booking.push({ ...doc.data(), ...{ id: doc.id } });

                });

                setBooking(booking.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBookingData();
    },);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleNotificationOpen = (event) => {
        setAnchorElmain(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMobileMenuCloseMain = () => {
        setMobileMoreAnchorElmain(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleNotificationClose = () => {
        setAnchorElmain(null);
        handleMobileMenuCloseMain();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    const handleMobileMenuOpenMain = (event) => {
        setMobileMoreAnchorElmain(event.currentTarget);
    };
    const notificationId = 'main-menu';
    const renderNotifications = (
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorElmain}
            open={isNotificationOpen}
            onClose={handleNotificationClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <MenuItem onClick={handleNotificationClose}></MenuItem>
            <MenuItem onClick={handleNotificationClose}></MenuItem>
            <MenuItem onClick={handleNotificationClose}></MenuItem>
        </Menu>
    );
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <div>
            {isAuthenticated ? (
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    id={menuId}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >

                    <MenuItem onClick={handleMenuClose}><strong>Hi, {user.displayName || user.email}</strong></MenuItem>
                    <MenuItem onClick={handleOpen}>Booking Details</MenuItem>
                    <MenuItem onClick={signUserOut}>Logout</MenuItem>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Hi, {user.displayName || user.email}. These are your booking details.
                            </Typography>
                            {/* {booking.map(b => (
                                <Typography id="modal-modal-description" sx={{ mt: 2 }} key={b.id}>
                                    Your booking is for: {b.date} at {b.start} till {b.end} for {b.people}.
                                </Typography>
                            ))} */}
                        </Box>
                    </Modal>



                </Menu>
            ) : (
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    id={menuId}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <Link style={{ textDecoration: "none", color: "black" }} to="/login"><MenuItem onClick={handleMenuClose} >Login</MenuItem></Link>
                </Menu>
            )
            }
        </div >
    );


    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>

                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >

                    <AccountCircle />
                </IconButton>
                <p>{user.displayName || user.email}</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1, }}>
            <AppBar position="static" sx={{
                backgroundColor: '#dfdfdf',

            }}>
                <Toolbar >

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link to={"/"}><Img src={Logo} alt="System-Logo" /></Link>

                    </Typography>
                    <Search>
                        <form>
                            <SearchIconWrapper>
                                <SearchIcon sx={{ color: "black" }} />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={onChange}
                                value={value}
                            />
                            <span></span>
                        </form>
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            aria-controls={notificationId}
                            aria-haspopup="true"
                            onClick={handleNotificationOpen}

                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon sx={{ color: "black" }} />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {user.photoURL ? (
                                <img style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid black" }} src={user.photoURL} alt="avatar" />
                            ) : (

                                <AccountCircle />
                            )}
                        </IconButton>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {renderNotifications}
        </Box >
    );
}