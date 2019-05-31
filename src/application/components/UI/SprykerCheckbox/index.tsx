import * as React from 'react';
import { withStyles, Checkbox, FormControlLabel } from '@material-ui/core';
import { ISprykerCheckboxProps as Props } from './types';
import { styles } from './styles';
import { CheckIcon } from './icons';

const SprykerCheckboxComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes, inputName, label, isChecked, changeHandler } = props;

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={ isChecked }
                    onChange={ changeHandler }
                    name={ inputName }
                    value={ inputName }
                    classes={ { root: classes.inputCheckbox, checked: classes.checkedCheckbox } }
                    icon={ <CheckIcon /> }
                    checkedIcon={ <CheckIcon /> }
                />
            }
            label={ label }
            classes={{ root: classes.outerCheckbox, label: classes.label }}
        />
    );
};

export const SprykerCheckbox = withStyles(styles)(SprykerCheckboxComponent);
