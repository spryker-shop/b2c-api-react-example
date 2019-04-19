import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { IPreloaderProps as Props } from './types';
import { styles } from './styles';
const spinner = require('./img/spinner.gif');

const PreloaderComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes } = props;

    return (
        <div className={ classes.preloader }>
            <div className={ classes.preloaderInner }>
                { spinner }
            </div>
        </div>
    );
};

export const Preloader = withStyles(styles)(PreloaderComponent);
