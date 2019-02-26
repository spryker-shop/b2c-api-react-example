import * as React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { IProductAvailabilityProps } from './types';
import { styles } from './styles';

export const ProductAvailabilityBase: React.SFC<IProductAvailabilityProps> = (props): JSX.Element => {
    const {classes, availability} = props;

    return (
        <div className={classes.root}>
            <Typography
                className={`${classes.value} ${classes[availability === 'Available' ? 'available' : 'unavailable']}`}
                component="span"
            >
                {availability}
            </Typography>
        </div>
    );
};

export const ProductAvailability = withStyles(styles)(ProductAvailabilityBase);
