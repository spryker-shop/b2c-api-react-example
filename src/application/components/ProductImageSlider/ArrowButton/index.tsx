import * as React from 'react';
import { IArrowButton } from './types';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';

const ArrowButtonComponent = (props: IArrowButton): JSX.Element => {
    const { icon, classes, ...arrowProps } = props;

    return (
        <div { ...arrowProps } >
            <div className={ classes.button }>
                <span className={ classes.icon }>
                    { icon }
                </span>
            </div>
        </div>
    );
};

export const ArrowButton = withStyles(styles)(ArrowButtonComponent);
