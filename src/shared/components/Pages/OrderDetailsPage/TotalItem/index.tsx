import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { AppPrice } from '@components/Common/AppPrice';
import { ITotalItemProps } from './types';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export const TotalItemBase: React.SFC<ITotalItemProps> = props => {
    const {
        classes,
        value,
        title,
        valueSign,
        extraClassName
    } = props;

    if (!value) {
        return null;
    }

    return (
        <Grid container justify="space-between" className={`${classes.root} ${extraClassName ? extraClassName : ''}`}>
            <Grid item xs={12} sm={7} className={classes.titleOuter}>
                <Typography
                    component="h5"
                    color="inherit"
                    className={classes.title}
                >
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={5} className={classes.valueOuter}>
                {valueSign ? valueSign : null}
                <AppPrice
                    value={value}
                    extraClassName={classes.price}
                    isStylesInherited={true}
                />
            </Grid>
        </Grid>
    );
};

export const TotalItem = withStyles(styles)(TotalItemBase);
