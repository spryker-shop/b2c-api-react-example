import * as React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { ICustomerPageTitleProps as Props } from './types';
import { styles } from './styles';

export const CustomerPageTitleBase: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        extraClasses = '',
        containerExtraClasses,
        title,
        intro
    } = props;

    return (
        <div className={ `${classes.container} ${containerExtraClasses ? containerExtraClasses : ''}` }>
            <Typography
                component="h1"
                align="left"
                className={ extraClasses ? classes.pageHeader : `${classes.pageHeader} ${extraClasses}` }
            >
                { title }
            </Typography>
            { intro &&
                <Typography color="inherit" component="p" className={ classes.intro }>
                    { intro }
                </Typography>
            }
        </div>
    );
};

export const CustomerPageTitle = withStyles(styles)(CustomerPageTitleBase);
