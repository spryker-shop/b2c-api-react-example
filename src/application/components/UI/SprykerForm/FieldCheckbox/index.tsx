import * as React from 'react';
import { withStyles, Checkbox, FormControlLabel } from '@material-ui/core';
import { sprykerFormStyles } from '@components/UI/SprykerForm/sprykerFormStyles';
import { IFieldCheckboxProps as Props } from './types';

export const FieldCheckboxBase: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        inputName,
        label,
        isChecked,
        changeHandler
    } = props;

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={isChecked}
                    onChange={changeHandler}
                    name={inputName}
                    value={inputName}
                    classes={{root: classes.inputCheckbox, checked: classes.checkedCheckbox}}
                />
            }
            label={label}
            classes={{root: classes.outerCheckbox, label: `${classes.label} ${classes.labelCheckbox}`}}
        />
    );
};

export const FieldCheckbox = withStyles(sprykerFormStyles)(FieldCheckboxBase);
