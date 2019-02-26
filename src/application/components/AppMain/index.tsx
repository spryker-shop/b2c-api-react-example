import * as React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { styles } from './styles';
import { IAppMainProps as Props } from './types';

export const AppMainBase: React.SFC<Props> = (props): JSX.Element => {
    const { classes } = props;

    return (
        <main className={ classes.layout }>
            <Grid
                item
                xs={ 12 }
                container
                direction="row"
                alignItems="flex-start"
                className={ classes.container }
            >
                { props.children }
            </Grid>
        </main>
    );
};

export const AppMain = withStyles(styles)(AppMainBase);
