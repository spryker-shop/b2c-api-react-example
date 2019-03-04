import * as React from 'react';
import { withStyles, Grid, Button } from '@material-ui/core';
import { PopoverWrapper } from '@application/components/PopoverWrapper';
import { createSliderWithTooltip, Range } from 'rc-slider';
import { ChevronIcon } from './icons';
// import 'rc-slider/assets/index.css';
// import 'rc-tooltip/assets/bootstrap.css';
import { ISprykerRangeSliderProps as Props, ISprykerRangeSliderState as State } from './types';
import { styles } from './styles';
import { ClickEvent } from '@interfaces/common';

class SprykerRangeSliderComponent extends React.Component<Props, State> {
    protected buttonRef: React.RefObject<HTMLDivElement> = React.createRef();

    public readonly state: State = {
        minPopoverWidth: 0,
        anchorElement: null
    };

    protected openPopover = ({ currentTarget }: ClickEvent): void => {
        this.setState({ anchorElement: currentTarget, minPopoverWidth: currentTarget.clientWidth });
    }

    protected closePopover = (): void => this.setState({ anchorElement: null });

    public render(): JSX.Element {
        const {
            classes,
            title,
            attributeName,
            handleChange,
            handleAfterChange,
            min,
            max,
            valueFormatter,
            currentValue
        } = this.props;
        const { anchorElement, minPopoverWidth } = this.state;
        const isOpen = Boolean(anchorElement);
        const WithTooltipRange = createSliderWithTooltip(Range);

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
                    containerWidth={minPopoverWidth}
                    paperProps={{
                        style: {
                            width: minPopoverWidth
                        }
                    }}
                >
                    <Grid container>
                        <Grid item xs={ 12 } className={ classes.rangeOuter }>
                            <WithTooltipRange
                                className={ classes.range }
                                value={ [currentValue.min, currentValue.max] }
                                min={ min }
                                max={ max }
                                defaultValue={ [min, max] }
                                onChange={ (value: number[]) => handleChange(attributeName, {
                                    min: value[0],
                                    max: value[1]
                                }) }
                                onAfterChange={ handleAfterChange }
                                tipProps={ {
                                    placement: 'top'
                                } }
                                railStyle={ { top: '10px', backgroundColor: '#111111', height: '2px' } }
                                dotStyle={ {} }
                                handleStyle={ {
                                    border: '1px solid #111111',
                                    width: '24px',
                                    height: '24px',
                                    backgroundColor: '#fbfbfb',
                                    marginLeft: '-12px'
                                } }
                                activeDotStyle={ {} }
                                trackStyle={ [{ top: '10px', backgroundColor: '#111111', height: '2px' }] }
                            />
                        </Grid>

                        <Grid container alignItems="center">
                            <Grid item xs={ 6 } className={ `${classes.value} ${classes.valueMin}` }>
                                { valueFormatter ? valueFormatter(currentValue.min) : currentValue.min }
                            </Grid>

                            <Grid item xs={ 6 } className={ `${classes.value} ${classes.valueMax}` }>
                                { valueFormatter ? valueFormatter(currentValue.max) : currentValue.max }
                            </Grid>
                        </Grid>
                    </Grid>
                </PopoverWrapper>
            </>
        );
    }
};

export const SprykerRangeSlider = withStyles(styles)(SprykerRangeSliderComponent);
