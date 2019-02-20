import * as React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { IAppPageSubTitleProps as Props } from './types';
import { styles } from './styles';

export const AppPageSubTitleBase: React.SFC<Props> = (props): JSX.Element => {
    const {classes, title, extraClass} = props;

    if (!title) {
        return null;
    }

    return (
        <Typography component="h2" color="inherit" className={`${classes.title} ${extraClass ? extraClass : ''}`}>
            {title}
        </Typography>
    );
};

export const AppPageSubTitle = withStyles(styles)(AppPageSubTitleBase);
