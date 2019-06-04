import * as React from 'react';
import { Dialog, Slide, withStyles } from '@material-ui/core';
import { ISprykerDialogProps as Props } from './types';
import { styles } from './styles';

const SprykerDialogComponent: React.SFC<Props> = (props): JSX.Element => {
    const { handleShow, isOpen, classes } = props;

    return (
        <Dialog
            open={ isOpen }
            fullWidth
            TransitionComponent={ props => <Slide direction="up" {...props} /> }
            onClose={ handleShow }
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            classes={{ paper: classes.paper }}
        >
            { props.children }
        </Dialog>
    );
};

export const SprykerDialog = withStyles(styles)(SprykerDialogComponent);
