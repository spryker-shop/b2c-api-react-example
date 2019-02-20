import * as React from 'react';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { IAppPageTitleProps as Props } from './types';
import { styles } from './styles';

export const AppPageTitleBase: React.SFC<Props> = (props): JSX.Element => {
    const { classes, title, intro } = props;

    return (
        <Grid container
              justify="flex-start"
              alignItems="center"
              className={ classes.root }
        >
            <Grid item xs={ 12 }>
                { title &&
                <Typography
                    component="h1"
                    color="inherit"
                    align="left"
                    className={ classes.pageHeader }
                    id="pageTitle"
                >
                    { title }
                </Typography>
                }
                { intro &&
                <Typography color="inherit" paragraph className={ classes.paragraph }>
                    { intro }
                </Typography>
                }
            </Grid>
        </Grid>
    );
};

export const AppPageTitle = withStyles(styles)(AppPageTitleBase);
