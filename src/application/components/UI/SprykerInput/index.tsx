import * as React from 'react';
import { InputMask } from './InputMask';
import { withStyles, TextField, InputAdornment } from '@material-ui/core';
import { ISprykerInputProps as Props } from './types';
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
        placeholderText,
        icon,
        iconPosition,
        maskProps
    } = props;
    const iconComponent = Boolean(icon) ? (
        <InputAdornment
            position={ iconPosition }
            classes={{
                root: classes.icon,
                positionStart: classes.iconPositionStart,
                positionEnd: classes.iconPositionEnd
            }}
        >
            { icon }
        </InputAdornment>
    ) : null;
    const inputIconModifier = iconPosition === 'start' ? classes.inputStartIcon : classes.inputEndIcon;

    return (
        <TextField
            required={ Boolean(isRequired) }
            id={`${formName}_${inputName}`}
            label={ label || null }
            name={ inputName }
            error={ isError }
            InputProps={{
                inputProps: {...maskProps},
                disableUnderline: true,
                classes: {
                    root: classes.inputRoot,
                    input: `${classes.input} ${icon ? inputIconModifier : ''}`,
                    error: classes.error
                },
                startAdornment: iconComponent,
                inputComponent: maskProps ? InputMask : 'input',
            }}
            InputLabelProps={{
                shrink: true,
                FormLabelClasses: {
                    root: classes.label,
                    focused: classes.labelFocused,
                    asterisk: classes.asterisk,
                    error: classes.labelError
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

SprykerInputComponent.defaultProps = {
    icon: null,
    iconPosition: 'start',
    maskProps: null
};

export const SprykerInput = withStyles(styles)(SprykerInputComponent);
