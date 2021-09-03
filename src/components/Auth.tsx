import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '@/store/userSlice';
import { auth, provider, storage } from '@/firebase';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  makeStyles,
  IconButton,
  Box,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CameraIcon from '@material-ui/icons/Camera';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from '@/styles/components/Auth.module.scss';
import { genRandomChar } from '@/libraries/utilFunction';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type Props = {
  closeAuthScreen: () => void;
};

const Auth: React.FC<Props> = ({ closeAuthScreen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [resetEmail, setResetEmail] = useState('');
  const [isOpenResetPasswordForm, setIsOpenResetPasswordForm] = useState(false);

  const sendResetEmail = async () => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setIsOpenResetPasswordForm(false);
        setResetEmail('');
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail('');
      });
  };
  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      e.target.value = '';
    }
  };
  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password);
  };
  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password);
    let url = '';
    if (avatarImage) {
      // firebaseの仕様で同じファイル名の画像を複数uploadすると、元々あった名前が削除されてしまうのを防ぐ
      // そのためランダムなファイル名を作成する必要がある
      const fileName = genRandomChar() + '_' + avatarImage.name;
      await storage.ref(`avatars/${fileName}`).put(avatarImage); // 画像をavatars/にuploadする
      url = await storage.ref('avatars').child(fileName).getDownloadURL(); // uploadした画像のURLを取得する
    }
    await authUser.user?.updateProfile({
      displayName: username,
      photoURL: url,
    });
    dispatch(
      updateUserProfile({
        displayName: username,
        photoUrl: url,
      }),
    );
  };

  const signInGoogle = async () => {
    closeAuthScreen();
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <Grid container>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        <form className={classes.form} noValidate>
          {!isLogin && (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(e.target.value);
                }}
              />
              <Box textAlign="center">
                <IconButton>
                  <label>
                    <AccountCircleIcon
                      fontSize="large"
                      className={
                        avatarImage ? styles.avatar_image_loaded : styles.avatar_image_unloaded
                      }
                    />
                    <input className={styles.hidden} type="file" onChange={onChangeImageHandler} />
                  </label>
                </IconButton>
              </Box>
            </>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            disabled={
              isLogin
                ? !email || password.length < 6
                : !username || !email || password.length < 6 || !avatarImage
            }
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={<EmailIcon />}
            onClick={
              isLogin
                ? async () => {
                    try {
                      await signInEmail();
                    } catch (err) {
                      alert(err.message);
                    }
                    closeAuthScreen();
                  }
                : async () => {
                    try {
                      await signUpEmail();
                    } catch (err) {
                      alert(err.message);
                    }
                  }
            }
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
          <Grid container>
            <Grid item xs>
              <span
                className={styles.reset_password}
                onClick={() => setIsOpenResetPasswordForm(!isOpenResetPasswordForm)}
              >
                Forgot password ?
              </span>
            </Grid>
            <Grid item>
              <span className={styles.login_register_toggle} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Create new account ?' : 'Back to login'}
              </span>
            </Grid>
          </Grid>
        </form>
        {isOpenResetPasswordForm && (
          <Grid container className={styles.reset_password_form}>
            <Grid item xs>
              <TextField
                className={styles.reset_password_text_field}
                InputLabelProps={{
                  shrink: true,
                }}
                type="email"
                name="email"
                label="Reset E-mail"
                value={resetEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setResetEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={sendResetEmail}>
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          startIcon={<CameraIcon />}
          onClick={signInGoogle}
        >
          SignIn with Google
        </Button>
        <Button variant="contained" color="primary" onClick={() => closeAuthScreen()}>
          Close
        </Button>
      </div>
    </Grid>
  );
};

export default Auth;
