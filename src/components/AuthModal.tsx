import React, { useState } from 'react';
import { applyModelStyle } from '@/libraries/utilFunction';
import { makeStyles, Theme, createStyles, Modal } from '@material-ui/core';
import Auth from '@/components/Auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

type Props = {
  isOpen: boolean;
  setOpenModal: Function;
};

const AuthModal: React.FC<Props> = ({ isOpen, setOpenModal }) => {
  const classes = useStyles();
  const [modalStyle] = useState(applyModelStyle);

  return (
    <Modal open={isOpen} onClose={() => setOpenModal(false)}>
      <div className={classes.paper} style={modalStyle}>
        <Auth closeAuthScreen={() => setOpenModal()} />
      </div>
    </Modal>
  );
};

export default AuthModal;
