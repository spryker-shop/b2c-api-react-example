import * as React from 'react';
import { connect } from './connect';
import { SprykerNumberFormatInput } from '@application/components/UI/SprykerNumberFormatInput';
import { withStyles, Grid, Button } from '@material-ui/core';
import { PopoverWrapper } from '@application/components/PopoverWrapper';
import { Range } from 'rc-slider';
import { ChevronIcon } from './icons';
import { ISprykerRangeSliderProps as Props, ISprykerRangeSliderState as State } from './types';
import { ClickEvent, InputChangeEvent } from '@interfaces/common';
import { styles } from './styles';

class SprykerRangeSliderComponent extends React.Component<Props, State> {
    protected buttonRef: React.RefObject<HTMLDivElement> = React.createRef();

    public readonly state: State = {
        minPopoverWidth: 0,
        anchorElement: null,
        currentMinValue: 0,
        currentMaxValue: 0
    };

    protected openPopover = ({ currentTarget }: ClickEvent): void => {
        const { currentValue } = this.props;

        this.setState(() => ({
            currentMinValue: currentValue.min,
            currentMaxValue: currentValue.max,
            anchorElement: currentTarget,
            minPopoverWidth: currentTarget.clientWidth
        }));
    };

    protected closePopover = (): void => {
        const { handleAfterChange } = this.props;
        const { currentMinValue, currentMaxValue } = this.state;

        this.setState({ anchorElement: null });

        handleAfterChange([currentMinValue, currentMaxValue]);
    };

    protected handleChangeRange = (value: number[]): void => {
        const { handleChange, attributeName } = this.props;
        this.setState({ currentMinValue: value[0], currentMaxValue: value[1] });

        handleChange(attributeName, {
            min: value[0],
            max: value[1]
        });
    };

    protected onFieldMinChangeHandler = (event: InputChangeEvent): void => {
        const { handleChange, attributeName, min } = this.props;
        const { currentMaxValue } = this.state;
        const newValue = Number(event.target.value);

        if (newValue < currentMaxValue && newValue >= min) {
            this.setState({ currentMinValue: newValue });

            handleChange(attributeName, {
                min: newValue,
                max: currentMaxValue
            });
        }
    };

    protected onFieldMaxChangeHandler = (event: InputChangeEvent): void => {
        const { handleChange, attributeName, max } = this.props;
        const { currentMinValue } = this.state;
        const newValue = Number(event.target.value);

        if (currentMinValue < newValue && newValue <= max) {
            this.setState({ currentMaxValue: newValue });

            handleChange(attributeName, {
                min: currentMinValue,
                max: newValue
            });
        }
    };

    public render(): JSX.Element {
        const { classes, title, min, max, currency } = this.props;
        const { anchorElement, minPopoverWidth, currentMinValue, currentMaxValue } = this.state;
        const isOpen = Boolean(anchorElement);

        return (
            <>
                <div className={ classes.root }>
                    <Button
                        buttonRef={ this.buttonRef }
                        aria-label="range"
                        onClick={ this.openPopover }
                        className={ `${classes.button} ${isOpen ? classes.isPopupOpened : '' }` }
                    >
                        <span className={ classes.text }>{ title }</span>
                    </Button>
                    <span className={ `${classes.icon} ${isOpen ? classes.iconOpened : ''}` }><ChevronIcon /></span>
                </div>

                <PopoverWrapper
                    anchorElement={ anchorElement }
                    closePopoverHandler={ this.closePopover }
                    containerWidth={ minPopoverWidth }
                    classes={ {
                        content: classes.popoverContent
                    } }
                    paperProps={ {
                        style: {
                            width: minPopoverWidth
                        }
                    } }
                >
                    <div className={ classes.rangeOuter }>
                        <Range
                            className={ classes.range }
                            value={ [currentMinValue, currentMaxValue] }
                            min={ min }
                            max={ max }
                            defaultValue={ [min, max] }
                            onChange={ (value: number[]) => this.handleChangeRange(value) }
                            allowCross={ false }
                        />
                    </div>

                    <Grid container alignItems="center">
                        <Grid item xs={ 6 } className={ `${classes.value} ${classes.valueMin}` }>
                            <SprykerNumberFormatInput
                                name="min"
                                currency={ currency }
                                className={ classes.input }
                                value={ currentMinValue }
                                onChange={ this.onFieldMinChangeHandler }
                                type="text"
                            />
                        </Grid>

                        <Grid item xs={ 6 } className={ `${classes.value} ${classes.valueMax}` }>
                            <SprykerNumberFormatInput
                                name="min"
                                currency={ currency }
                                className={ classes.input }
                                value={ currentMaxValue }
                                onChange={ this.onFieldMaxChangeHandler }
                                type="text"
                            />
                        </Grid>
                    </Grid>
                </PopoverWrapper>
            </>
        );
    }
}

export const SprykerRangeSlider = connect(withStyles(styles)(SprykerRangeSliderComponent));
