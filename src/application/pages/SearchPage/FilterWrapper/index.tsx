import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import { IFilterWrapperProps } from '@application/pages/SearchPage/FilterWrapper/types';

export const FilterWrapperBase: React.SFC<IFilterWrapperProps> = props => {
    const {filter, keyValue} = props;

    return (
        <Grid item xs={12} sm={6} md={4} key={keyValue}>
            {filter}
        </Grid>
    );
};

export const FilterWrapper = withStyles(styles)(FilterWrapperBase);
