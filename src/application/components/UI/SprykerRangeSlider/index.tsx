import * as React from 'react';
import { withStyles, Grid, Button } from '@material-ui/core';
import { PopoverWrapper } from '@application/components/PopoverWrapper';
import { createSliderWithTooltip, Range } from 'rc-slider';
import { ChevronIcon } from './icons';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { ISprykerRangeSliderProps as Props, ISprykerRangeSliderState as State } from './types';
import { styles, rangeHandler } from './styles';
import { ClickEvent } from '@interfaces/common';

const WithTooltipRange = createSliderWithTooltip(Range);

class SprykerRangeSliderComponent extends React.Component<Props, State> {
    protected buttonRef: React.RefObject<HTMLDivElement> = React.createRef();

    public readonly state: State = {
        minPopoverWidth: 0,
        anchorElement: null,
        currentMinValue: 0,
        currentMaxValue: 0
    };

    // public static getDerivedStateFromProps = (nextProps: Props, prevState: State): State => {
    //     console.log(nextProps.max, nextProps.min, 67459786708754568907654789076590);
    //     if (nextProps.min !== prevState.currentMinValue) {
    //         return {
    //             ...prevState,
    //             currentMinValue: nextProps.min
    //         };
    //     }
    //
    //     if (nextProps.max !== prevState.currentMaxValue) {
    //         return {
    //             ...prevState,
    //             currentMaxValue: nextProps.max
    //         };
    //     }
    //
    //     return null;
    // };

    protected openPopover = ({ currentTarget }: ClickEvent): void => {
        const { max, min } = this.props;

        this.setState({
            currentMinValue: min,
            currentMaxValue: max,
            anchorElement: currentTarget,
            minPopoverWidth: currentTarget.clientWidth
        });
    };

    protected closePopover = (): void => this.setState({ anchorElement: null });

    protected handleChangeRange = (value: number[]): void => {
        const { handleChange, attributeName } = this.props;
        console.log(value[0], value[1]);
        this.setState({
            currentMinValue: value[0],
            currentMaxValue: value[1]
        });

        // handleChange(attributeName, {
        //     min: value[0],
        //     max: value[1]
        // });
    };

    public render(): JSX.Element {
        const {
            classes,
            title,
            handleAfterChange,
            min,
            max,
            valueFormatter,
            currentValue
        } = this.props;
        const { anchorElement, minPopoverWidth, currentMinValue, currentMaxValue } = this.state;
        const isOpen = Boolean(anchorElement);

        return (
            <>
                <div className={ classes.root }>
                    <Button
                        buttonRef={ this.buttonRef }
                        aria-label="range"
                        onClick={ this.openPopover }
                        className={`${classes.button} ${isOpen ? classes.isPopupOpened : '' }`}
                    >
                        <span className={ classes.text }>{ title }</span>
                    </Button>
                    <span className={`${classes.icon} ${isOpen ? classes.iconOpened : ''}`}><ChevronIcon /></span>
                </div>

                <PopoverWrapper
                    anchorElement={ anchorElement }
                    closePopoverHandler={ this.closePopover }
                    paperProps={{
                        style: {
                            width: minPopoverWidth
                        }
                    }}
                    classes={{

                    }}
                >
                    <Grid container>
                        <Grid item xs={ 12 } className={ classes.rangeOuter }>
                            <WithTooltipRange
                                className={ classes.range }
                                value={ [currentMinValue, currentMaxValue] }
                                min={ min }
                                max={ max }
                                defaultValue={ [min, max] }
                                onChange={ (value: number[]) => this.handleChangeRange(value) }
                                onAfterChange={ handleAfterChange }

                                railStyle={ { top: '10px', backgroundColor: '#111111', height: '2px' } }
                                dotStyle={ {} }
                                handleStyle={ rangeHandler }
                                activeDotStyle={ {} }
                                trackStyle={ [{ top: '10px', backgroundColor: '#111111', height: '2px' }] }
                            />
                        </Grid>

                        <Grid container alignItems="center">
                            {/*<Grid item xs={ 6 } className={ `${classes.value} ${classes.valueMin}` }>*/}
                                {/*{ valueFormatter ? valueFormatter(currentMinValue) : currentMinValue }*/}
                            {/*</Grid>*/}

                            {/*<Grid item xs={ 6 } className={ `${classes.value} ${classes.valueMax}` }>*/}
                                {/*{ valueFormatter ? valueFormatter(currentMaxValue) : currentMaxValue }*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Grid>
                </PopoverWrapper>
            </>
        );
    }
};

export const SprykerRangeSlider = withStyles(styles)(SprykerRangeSliderComponent);
