import * as React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { IEmptyOrderProps } from './types';
import { styles } from './styles';

export const EmptyOrderBase: React.SFC<IEmptyOrderProps> = (props): JSX.Element => {
    const {classes, intro} = props;

    return (
        <Typography component="p" color="inherit" className={classes.intro}>
            {intro}
        </Typography>
    );
};

export const EmptyOrder = withStyles(styles)(EmptyOrderBase);
