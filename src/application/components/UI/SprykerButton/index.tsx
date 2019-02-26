import * as React from 'react';
import { withStyles, Button } from '@material-ui/core';
import { styles } from './styles';
import { ISprykerButtonProps as Props } from './types';

export const SprykerButtonBase: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        extraClasses = '',
        onClick,
        title,
        iconComponent,
        disabled,
        value,
        btnType
    } = props;

    return (
        <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={ !!disabled }
            className={ `${classes.button} ${extraClasses}` }
            value={ value }
            onClick={ onClick ? onClick : null }
            type={ btnType ? btnType : 'button' }
        >
            { title }
            { iconComponent ? iconComponent : null }
        </Button>
    );
};

export const SprykerButton = withStyles(styles)(SprykerButtonBase);
