import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles, Typography, Grid, Button } from '@material-ui/core';
import { IBannerProps as Props } from './types';
import { styles } from './styles';

const BannerComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, titleFirst, titleSecond, intro, linkPath, linkTitle, imagePath } = props;

    return (
        <div className={ classes.root }>
            <div className={ classes.container }>
                <Grid container className={ classes.content }>
                    <Grid item xs={ 12 } sm={ 8 } md={ 6 } className={ classes.holder }>
                        <Typography component="h1" variant="display4" className={ classes.title }>
                            <span>{ titleFirst }</span>
                            { titleSecond &&
                                <span>{ titleSecond }</span>
                            }
                        </Typography>
                        <Typography component="p" className={ classes.text }>{ intro }</Typography>

                        <Button
                            component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ linkPath } /> }
                            variant="contained"
                            className={ classes.btn }
                        >
                            { linkTitle }
                        </Button>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 4 } md={ 6 } className={ classes.imageContainer }>
                        <span className={ classes.image } style={{ backgroundImage: `url(${imagePath})` }} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export const Banner = withStyles(styles)(BannerComponent);
