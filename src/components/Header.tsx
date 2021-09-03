import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/userSlice';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UserMenu from '@/components/userMenu';
import AuthModal from '@/components/AuthModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Header: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [isAuthScreen, setIsAuthScreen] = useState(false);

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Test site
            </Typography>
            {user.uid ? (
              <UserMenu />
            ) : (
              <Button color="inherit" onClick={() => setIsAuthScreen(true)}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <AuthModal
        isOpen={isAuthScreen}
        setOpenModal={(isOpen: boolean) => setIsAuthScreen(isOpen)}
      />
    </>
  );
};

export default Header;
