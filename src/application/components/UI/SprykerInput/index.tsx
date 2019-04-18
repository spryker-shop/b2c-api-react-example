import * as React from 'react';
import { InputMask } from './InputMask';
import { withStyles, TextField } from '@material-ui/core';
import { ISprykerInputProps as Props } from './types';
import { InputIcon } from './InputIcon';
import { styles } from './styles';
import { IInputIconProps } from './InputIcon/types';

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
        maskProps,
        iconProps: {
            iconStartComponent,
            iconEndComponent
        }
    } = props;
    const renderIconComponent = (iconProps: IInputIconProps, position: 'end' | 'start'): JSX.Element => (
        <InputIcon
            { ...iconProps }
            position={ position }

        />
    );
    const inputStartIconModifier = iconStartComponent ? classes.inputStartIcon : '';
    const inputEndIconModifier = iconEndComponent ? classes.inputEndIcon : '';

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
                    input: `${classes.input} ${inputStartIconModifier} ${inputEndIconModifier}`,
                    error: classes.error
                },
                startAdornment: renderIconComponent(iconStartComponent, 'start'),
                endAdornment: renderIconComponent(iconEndComponent, 'end'),
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
    iconProps: {
        iconStartComponent: null,
        iconEndComponent: null,
    },
    maskProps: null
};

export const SprykerInput = withStyles(styles)(SprykerInputComponent);
