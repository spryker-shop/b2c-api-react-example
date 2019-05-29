/* tslint:disable:max-file-line-count */
import * as React from 'react';
import { connect } from './connect';
import { NumberFormatValues } from 'react-number-format';
import { SprykerNumberFormatInput } from '@components/UI/SprykerNumberFormatInput';
import { withStyles, Grid, Button, withWidth } from '@material-ui/core';
import { PopoverWrapper } from '@components/PopoverWrapper';
import { Range } from 'rc-slider';
import { ChevronIcon } from './icons';
import { ISprykerRangeSliderProps as Props, ISprykerRangeSliderState as State } from './types';
import { ClickEvent } from '@interfaces/common';
import { styles } from './styles';
import { isWidthUp } from '@material-ui/core/withWidth';
import { resolutionChecker } from '@helpers/common';

class SprykerRangeSliderComponent extends React.Component<Props, State> {
    protected buttonRef: React.RefObject<HTMLDivElement> = React.createRef();

    public readonly state: State = {
        minPopoverWidth: 0,
        anchorElement: null,
        currentMinValue: 0,
        currentMaxValue: 0
    };

    protected openPopover = (event: ClickEvent): void => {
        const { currentTarget } = event;
        const isMobile = resolutionChecker(window.innerWidth, 'md');
        const { currentValue, openFilter } = this.props;

        this.setState(({anchorElement}) => ({
            currentMinValue: currentValue.min,
            currentMaxValue: currentValue.max,
            anchorElement: Boolean(anchorElement) ? null : currentTarget,
            minPopoverWidth: currentTarget.clientWidth
        }));

        if (isMobile) {
            openFilter(event);
        }
    };

    protected closePopover = (): void => {
        const { handleAfterChange } = this.props;
        const { currentMinValue, currentMaxValue } = this.state;

        this.setState({ anchorElement: null });

        handleAfterChange([currentMinValue, currentMaxValue]);
    };

    protected handleChangeRange = (value: number[]): void => {
        const { handleChange, attributeName, min, max } = this.props;
        this.setState({ currentMinValue: value[0], currentMaxValue: value[1] }, () => {
            const { currentMinValue, currentMaxValue } = this.state;

            handleChange(attributeName, {
                min: currentMinValue === min ? min : value[0],
                max: currentMaxValue === max ? max : value[1]
            });
        });
    };

    protected isShouldUpdateMinField = (values: NumberFormatValues): boolean => {
        const { handleChange, attributeName } = this.props;
        const { currentMaxValue } = this.state;
        const newValue = values.floatValue;
        const valueOnEmptyField = 0;

        if (!Boolean(values.formattedValue.length)) {
            this.setState({ currentMinValue: valueOnEmptyField });

            handleChange(attributeName, {
                min: valueOnEmptyField,
                max: currentMaxValue
            });

            return true;
        }

        this.setState({ currentMinValue: newValue });

        handleChange(attributeName, {
            min: newValue,
            max: currentMaxValue
        });

        return true;
    };

    protected handleBlurMinField = (): void => {
        const { currentMinValue, currentMaxValue } = this.state;
        const { handleChange, attributeName, min } = this.props;

        if (currentMinValue < min) {
            this.setState({ currentMinValue: min });

            handleChange(attributeName, {
                min,
                max: currentMaxValue
            });
        }

        if (currentMinValue >= currentMaxValue) {
            const decrementFromMaxCurrentValue = 1;
            this.setState({ currentMinValue: currentMaxValue - decrementFromMaxCurrentValue });

            handleChange(attributeName, {
                min: currentMaxValue - decrementFromMaxCurrentValue,
                max: currentMaxValue
            });
        }
    };

    protected isShouldUpdateMaxField = (values: NumberFormatValues): boolean => {
        const { handleChange, attributeName, max } = this.props;
        const { currentMinValue } = this.state;
        const newValue = values.floatValue;
        const valueOnEmptyField = 0;

        if (!Boolean(values.formattedValue.length)) {
            this.setState({ currentMaxValue: valueOnEmptyField });

            handleChange(attributeName, {
                min: currentMinValue,
                max: valueOnEmptyField
            });

            return true;
        }

        this.setState({ currentMaxValue: newValue });

        handleChange(attributeName, {
            min: currentMinValue,
            max: newValue
        });

        return true;
    };

    protected handleBlurMaxField = (): void => {
        const { currentMinValue, currentMaxValue } = this.state;
        const { handleChange, attributeName, max } = this.props;

        if (currentMaxValue > max) {
            this.setState({ currentMaxValue: max });

            handleChange(attributeName, {
                min: currentMinValue,
                max
            });
        }

        if (currentMaxValue <= currentMinValue) {
            const incrementFromMinCurrentValue = 1;
            this.setState({ currentMaxValue: currentMinValue + incrementFromMinCurrentValue });

            handleChange(attributeName, {
                min: currentMinValue,
                max: currentMinValue + incrementFromMinCurrentValue
            });
        }
    };

    protected renderRangeContent = (): JSX.Element => {
        const { classes, min, max, currency, isActive } = this.props;
        const { currentMinValue, currentMaxValue } = this.state;

        return (
            <div className={`${classes.wrapper} ${isActive ? classes.wrapperOpened : ''}`}>
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

                <Grid container alignItems="center" justify="space-between" spacing={ 24 }>
                    <Grid item>
                        <SprykerNumberFormatInput
                            name="min"
                            currency={ currency }
                            className={ classes.input }
                            value={ currentMinValue }
                            isAllowed={ this.isShouldUpdateMinField }
                            type="text"
                            onBlur={ this.handleBlurMinField }
                        />
                    </Grid>
                    <Grid item>
                        <SprykerNumberFormatInput
                            name="min"
                            currency={ currency }
                            className={ classes.input }
                            value={ currentMaxValue }
                            isAllowed={ this.isShouldUpdateMaxField }
                            type="text"
                            onBlur={ this.handleBlurMaxField }
                        />
                    </Grid>
                </Grid>
            </div>
        );
    };

    public render(): JSX.Element {
        const { classes, title, width, isActive } = this.props;
        const { anchorElement, minPopoverWidth } = this.state;
        const isOpen = Boolean(anchorElement);

        if (isWidthUp('md', width)) {
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
                        anchorReference="anchorEl"
                        hideBackdrop={ false }
                        closePopoverHandler={ this.closePopover }
                        classes={{ content: classes.popoverContent }}
                        paperProps={{ style: { minWidth: minPopoverWidth } }}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                        { this.renderRangeContent() }
                    </PopoverWrapper>
                </>
            );
        }

        return (
            <>
                <div className={ classes.root }>
                    <Button
                        aria-label="range"
                        onClick={ this.openPopover }
                        className={ `${classes.button} ${isActive ? classes.isPopupOpened : '' }` }
                    >
                        <span className={ classes.text }>{ title }</span>
                    </Button>
                    <span className={ `${classes.icon} ${isActive ? classes.iconOpened : ''}` }><ChevronIcon /></span>
                </div>

                { this.renderRangeContent() }
            </>
        );
    }
}

export const SprykerRangeSlider = connect(withWidth()(withStyles(styles)(SprykerRangeSliderComponent)));
