import * as React from 'react';
import { TextField, withStyles } from '@material-ui/core';
import { InputChangeEvent } from '@interfaces/common';
import { SprykerQuantityCounterProps as Props, SprykerQuantityCounterState as State } from './types';
import { styles } from './styles';

class SprykerQuantityCounterComponent extends React.Component<Props, State> {
    protected timeout: NodeJS.Timer;

    public static defaultProps = {
        minThreshold: 1,
        step: 1,
        value: 1,
        delayDuration: 1000,
        isUseSubmitInspection: true
    };

    public readonly state: State = {
        inputValue: this.props.value,
        name: this.props.name
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const { isUpdateToDefault, value } = this.props;
        const isShouldUpdateToDefault = isUpdateToDefault === true && prevProps.isUpdateToDefault !== isUpdateToDefault;

        if (isShouldUpdateToDefault) {
            this.setState({ inputValue: value });
        }
    };

    protected delayToChangeQuantity = (name: string, value: number): void => {
        const { isUseSubmitInspection, handleChangeQty, delayDuration, value: propsValue } = this.props;
        const isSameValue = isUseSubmitInspection && propsValue === value;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if (!isSameValue) {
                handleChangeQty(name, value);
            }
        }, delayDuration);
    };

    public componentWillUnmount = (): void => {
        clearTimeout(this.timeout);
    };

    protected onChangeInputHandler = (event: InputChangeEvent): void => {
        const { value } = event.target;
        const { minThreshold } = this.props;
        const inputValue = Number(value) < minThreshold ? minThreshold : Number(value);

        this.setState({ inputValue });
    };

    protected incrementValueHandler = (): void => {
        const { inputValue, name } = this.state;
        const { step } = this.props;
        const newValue = Number(inputValue + step);

        this.setState({ inputValue: newValue });
        this.delayToChangeQuantity(name, newValue);
    };

    protected decrementValueHandler = (): void => {
        const { inputValue, name } = this.state;
        const { step } = this.props;
        const newValue = Number(inputValue - step);

        this.setState({ inputValue: newValue });
        this.delayToChangeQuantity(name, newValue);
    };

    protected onBlurInputHandler = (): void => {
        const { inputValue, name } = this.state;

        this.delayToChangeQuantity(name, inputValue);
    };

    public render(): JSX.Element {
        const { classes, name, minThreshold, isBigger } = this.props;
        const { inputValue } = this.state;
        const isButtonDisabled = inputValue === minThreshold;

        return (
            <form noValidate autoComplete="off" className={ classes.root }>
                <div className={ classes.container }>
                    <span
                        onClick={ this.decrementValueHandler }
                        className={ `
                            ${classes.trigger}
                            ${classes.triggerMinus}
                            ${isButtonDisabled ? classes.triggerDisabled : ''}
                            ${isBigger ? classes.triggerBigger : ''}
                        ` }
                    />
                    <TextField
                        required
                        name={ name }
                        value={ inputValue }
                        onChange={ this.onChangeInputHandler }
                        onBlur={ this.onBlurInputHandler }
                        type={ 'number' }
                        InputProps={ {
                            disableUnderline: true,
                            classes: {
                                input: `${classes.input} ${isBigger ? classes.inputBigger : ''}`
                            }
                        } }
                    />
                    <span
                        onClick={ this.incrementValueHandler }
                        className={`${classes.trigger} ${isBigger ? classes.triggerBigger : ''}`}
                    />
                </div>
            </form>
        );
    }
}

export const SprykerQuantityCounter = withStyles(styles)(SprykerQuantityCounterComponent);
