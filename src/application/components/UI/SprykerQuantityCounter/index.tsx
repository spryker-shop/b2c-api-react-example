import * as React from 'react';
import { TextField, withStyles } from '@material-ui/core';
import { InputChangeEvent } from '@interfaces/common';
import { SprykerQuantityCounterProps as Props, SprykerQuantityCounterState as State } from './types';
import { styles } from './styles';

class SprykerQuantityCounterComponent extends React.Component<Props, State> {
    protected readonly duration = 1000;
    protected timeout: NodeJS.Timer;

    public static defaultProps = {
        minThreshold: 1,
        step: 1,
        value: 1
    };

    public readonly state: State = {
        inputValue: this.props.value,
        name: this.props.name
    };

    public componentDidUpdate = (): void => {
        const { rejected, value } = this.props;

        if (rejected) {
            this.setState({ inputValue: value });
        }
    };

    protected delayToSubmit = (name: string, value: number): void => {
        const { handleChangeQty, value: propsValue } = this.props;
        const isSameValue = propsValue === value;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if (!isSameValue) {
                handleChangeQty(name, value);
            }
        }, this.duration);
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
        this.delayToSubmit(name, newValue);
    };

    protected decrementValueHandler = (): void => {
        const { inputValue, name } = this.state;
        const { step } = this.props;
        const newValue = Number(inputValue - step);

        this.setState({ inputValue: newValue });
        this.delayToSubmit(name, newValue);
    };

    protected onBlurInputHandler = (): void => {
        const { inputValue, name } = this.state;

        this.delayToSubmit(name, inputValue);
    };

    public render(): JSX.Element {
        const { classes, name, minThreshold } = this.props;
        const { inputValue } = this.state;
        const isButtonDisabled = inputValue === minThreshold;

        return (
            <form noValidate autoComplete="off">
                <div className={ classes.container }>
                    <span
                        onClick={ this.decrementValueHandler }
                        className={ `
                            ${classes.trigger}
                            ${classes.triggerMinus}
                            ${isButtonDisabled ? classes.triggerDisabled : ''}
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
                            classes: { input: classes.input }
                        } }
                    />
                    <span onClick={ this.incrementValueHandler } className={ `${classes.trigger}` } />
                </div>
            </form>
        );
    }
}

export const SprykerQuantityCounter = withStyles(styles)(SprykerQuantityCounterComponent);
