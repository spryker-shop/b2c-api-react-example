import * as React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { IPageTitleProps as Props } from './types';
import { styles } from './styles';

const PageTitleComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, title, children } = props;

    return (
        <div className={ classes.root }>
            <div className={ classes.container }>
                { title &&
                    <Typography component="h1" variant="h2" className={ classes.title }>
                        { title }
                    </Typography>
                }
                { children }
            </div>
        </div>
    );
};

export const PageTitle = withStyles(styles)(PageTitleComponent);
