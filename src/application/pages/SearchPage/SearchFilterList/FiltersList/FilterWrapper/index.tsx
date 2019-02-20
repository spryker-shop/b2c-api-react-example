import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import { IFilterWrapperProps } from './types';

export const FilterWrapper: React.SFC<IFilterWrapperProps> = props => {
    const {filter, keyValue} = props;

    return (
        <Grid item xs={12} sm={6} md={4} key={keyValue}>
            {filter}
        </Grid>
    );
};
