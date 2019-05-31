import * as React from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withStyles from '@material-ui/core/styles/withStyles';
import { INotificationsProps as Props } from './types';
import { styles } from './styles';

const NotificationsComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes } = props;

    return (
        <ToastContainer
            autoClose={ 5000 }
            transition={ Slide }
            position={ toast.POSITION.TOP_LEFT }
            hideProgressBar={ true }
            pauseOnHover={ false }
            pauseOnFocusLoss={ false }
            closeButton={ false }
            toastClassName={ classes.container }
            bodyClassName={ classes.body }
            className={ classes.wrapper }
            draggable={ false }
        />
    );
};

export const Notifications = withStyles(styles)(NotificationsComponent);
