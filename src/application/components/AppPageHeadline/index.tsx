import * as React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { IAppPageHeadlineProps as Props } from './types';
import { styles } from './styles';

export const AppPageHeadlineBase: React.SFC<Props> = (props): JSX.Element => {
    const {classes, title, extraClass} = props;

    if (!title) {
        return null;
    }

    return (
        <Typography
            component="h3"
            color="inherit"
            align="center"
            className={`${classes.title} ${extraClass ? extraClass : ''}`}
        >
            {title}
        </Typography>
    );
};

export const AppPageHeadline = withStyles(styles)(AppPageHeadlineBase);
