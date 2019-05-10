import * as React from 'react';
import { InputMask } from './InputMask';
import { withStyles, TextField } from '@material-ui/core';
import { ISprykerInputProps as Props, IIconProps } from './types';
import { InputIcon } from './InputIcon';
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
        helperText,
        maskProps,
        iconProps: {
            iconStartComponent,
            iconEndComponent
        }
    } = props;
    const renderIconComponent = (iconProps: IIconProps, position: 'end' | 'start'): JSX.Element => (
        <InputIcon
            { ...iconProps }
            position={ position }
            classes={{ icon: classes.icon }}
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
            helperText={ helperText || null }
            FormHelperTextProps={{
                error: isError,
                classes: {
                    root: classes.helperText,
                    error: classes.helperTextError
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
