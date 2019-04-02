import * as React from 'react';
import { withStyles, TextField } from '@material-ui/core';
import { SprykerInputProps as Props } from './types';
import { styles } from './styles';

const SprykerInputComponent: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        inputValue,
        inputType,
        formName,
        inputName,
        onChangeHandler,
        label,
        isError,
        isRequired,
        onBlurHandler,
        placeholderText
    } = props;

    return (
        <TextField
            required={ Boolean(isRequired) }
            id={`${formName}-${inputName}`}
            label={ label || null }
            name={ inputName }
            error={ isError }
            InputProps={{
                disableUnderline: true,
                classes: {
                    root: classes.inputRoot,
                    input: classes.input,
                    error: classes.error
                },
            }}
            InputLabelProps={{
                shrink: true,
                FormLabelClasses: {
                    root: classes.label,
                    focused: classes.labelFocused,
                    asterisk: classes.asterisk
                }
            }}
            type={ inputType || 'text' }
            value={ inputValue }
            helperText={ placeholderText || null }
            FormHelperTextProps={{
                classes: {
                    root: classes.placeholder,
                    filled: inputValue.toString().length > 0 ? classes.filled : ''
                }
            }}
            className={ classes.textField }
            onChange={ onChangeHandler }
            onBlur={ onBlurHandler }
            fullWidth
        />
    );
};

export const SprykerInput = withStyles(styles)(SprykerInputComponent);
