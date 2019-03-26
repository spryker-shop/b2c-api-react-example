import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import { IAppMainProps as Props } from './types';

const AppMainComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes } = props;

    return (
        <main className={classes.layout}>{ props.children }</main>
    );
};

export const AppMain = withStyles(styles)(AppMainComponent);
