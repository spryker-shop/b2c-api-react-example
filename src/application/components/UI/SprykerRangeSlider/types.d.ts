import { WithStyles } from '@material-ui/core';
import { styles } from '@application/components/UI/SprykerRangeSlider/styles';
import { TAppCurrency } from '@interfaces/currency';

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
    valueFormatter?: Function | null;
    currency: TAppCurrency;
}

export interface ISprykerRangeSliderState {
    anchorElement: HTMLElement | null;
    minPopoverWidth: number;
    currentMinValue: number;
    currentMaxValue: number;
}
