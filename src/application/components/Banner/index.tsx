import * as React from 'react';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { AppBtnLink } from '@application/components/AppBtnLink';
import { IBannerProps as Props } from './types';
import { styles } from './styles';

export const BannerComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, titleFirst, titleSecond, intro, linkPath, linkTitle, imagePath } = props;

    return (
        <Grid container className={ classes.root }>
            <Grid item xs={ 12 } className={ classes.container }>
                <Grid container className={ classes.content }>
                    <Grid item xs={ 12 } sm={ 8 } lg={ 6 } className={ classes.holder }>
                        <Typography
                            component="h1"
                            variant="display4"
                            className={ classes.title }
                        >
                            <span>{ titleFirst }</span>
                            { titleSecond &&
                                <span>{ titleSecond }</span>
                            }
                        </Typography>
                        <Typography
                            component="p"
                            className={ classes.text }
                        >
                            { intro }
                        </Typography>
                        <AppBtnLink title={ linkTitle } path={ linkPath } extraClassName={ classes.btn } />
                    </Grid>
                    <span className={ classes.imageContainer } style={ { backgroundImage: `url(${imagePath})` } } />
                </Grid>
            </Grid>
        </Grid>
    );
};

export const Banner = withStyles(styles)(BannerComponent);
