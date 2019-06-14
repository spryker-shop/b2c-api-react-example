import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import { IMainContainerProps as Props } from './types';

const MainContainerComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes } = props;

    return (
        <main className={ classes.wrapper }>
            <div className={ classes.layout }>{ props.children }</div>
        </main>
    );
};

export const MainContainer = withStyles(styles)(MainContainerComponent);
