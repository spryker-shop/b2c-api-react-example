import * as React from 'react';
type TAppColor = React.CSSProperties['color'];

export interface IAppColors {
    white: TAppColor;
    black: TAppColor;
    deepBlack: TAppColor;
    grey: TAppColor;
    lightGrey: TAppColor;
    weakGrey: TAppColor;
    greyBG: TAppColor;
    blue: TAppColor;
    blueTransparent: TAppColor;
    orange: TAppColor;
    red: TAppColor;
    weekRed: TAppColor;
    green: TAppColor;
    blockDivider: TAppColor;
}

export const appColors: IAppColors = {
    white: '#ffffff',
    black: '#111111',
    deepBlack: '#282c3d',
    grey: '#787878',
    lightGrey: '#f2f2f2',
    weakGrey: '#d8d8d8',
    greyBG: '#f8f8f8',
    blue: '#3589ea',
    blueTransparent: 'rgba(53, 137, 234, 0.1)',
    orange: '#ea7a35',
    red: '#D50000',
    weekRed: '#EB553C',
    green: '#008a00',
    blockDivider: '#e2e2e2',
};
