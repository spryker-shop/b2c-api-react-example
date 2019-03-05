import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { AppBtnLink } from '@application/components/AppBtnLink';
import { ICategoryTeaserProps as Props } from './types';
import { styles } from './styles';

export const CategoryTeaserBase: React.SFC<Props> = (props): JSX.Element => {
    const {classes, title, text, img, path, linkTitle, isOdd} = props;

    const thumbnailStyles = {
        backgroundImage: `url(${img})`
    };

    return (
        <Grid container className={classes.root} spacing={24}>
            <Grid item
                  xs={12}
                  sm={6}
                  className={`${classes.imageHolder} ${isOdd ? classes.oddImage : classes.evenImage}`}
            >
                <div style={thumbnailStyles} className={classes.thumbnail}></div>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.contentHolder}>
                <Grid item xs={12} className={classes.content}>
                    <Typography component="h2"
                                color="inherit"
                                align="left"
                                className={classes.title}
                    >
                        <FormattedMessage id={title} />
                    </Typography>
                    <Typography component="p"
                                color="inherit"
                                align="left"
                                className={classes.text}
                    >
                        <FormattedMessage id={text} />
                    </Typography>
                    <AppBtnLink
                        title={<FormattedMessage id={linkTitle} />}
                        path={path}
                        extraClassName={classes.btn}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export const CategoryTeaser = withStyles(styles)(CategoryTeaserBase);
