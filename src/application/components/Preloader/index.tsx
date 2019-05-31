import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { IPreloaderProps as Props } from './types';
import { styles } from './styles';
const spinner = require('./img/spinner.gif');

const PreloaderComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes, isStatic } = props;

    return (
        <div className={`${classes.preloader} ${isStatic ? classes.preloaderStatic : ''}`}>
            <img src={ spinner } className={ classes.preloaderImage } />
        </div>
    );
};

export const Preloader = withStyles(styles)(PreloaderComponent);
