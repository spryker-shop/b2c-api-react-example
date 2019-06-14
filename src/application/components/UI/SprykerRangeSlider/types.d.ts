import { WithStyles } from '@material-ui/core';
import { styles } from '@components/UI/SprykerRangeSlider/styles';
import { Breakpoint } from '@material-ui/core/es/styles/createBreakpoints';
import { ClickEvent } from '@interfaces/common';

type TSprykerRangeSliderValue = {min: number, max: number};

export type TSprykerRangeSliderName = 'min' | 'max';

export interface ISprykerRangeSliderProps extends WithStyles<typeof styles> {
    title: string;
    attributeName: string;
    handleChange: (name: string, {min, max}: TSprykerRangeSliderValue) => void;
    handleAfterChange: (value: number[]) => void;
    min: number;
    max: number;
    currentValue?: { min: number, max: number };
    valueFormatter?: Function;
    currency: string;
    width: Breakpoint;
    isActive: boolean;
    openFilter: (event: ClickEvent) => void;
}

export interface ISprykerRangeSliderState {
    anchorElement: HTMLElement;
    minPopoverWidth: number;
    currentMinValue: number;
    currentMaxValue: number;
}
