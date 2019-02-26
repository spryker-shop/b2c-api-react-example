import * as React from 'react';
type TAppColor = React.CSSProperties['color'];

export interface IAppColors {
    white: TAppColor;
    darkWhite: TAppColor;
    weekWhite: TAppColor;
    black: TAppColor;
    deepBlack: TAppColor;
    grey: TAppColor;
    lightGrey: TAppColor;
    weakGrey: TAppColor;
    greyBG: TAppColor;
    blue: TAppColor;
    darkBlue: TAppColor;
    weekBlue: TAppColor;
    blueTransparent: TAppColor;
    orange: TAppColor;
    red: TAppColor;
    darkRed: TAppColor;
    weekRed: TAppColor;
    green: TAppColor;
    blockDivider: TAppColor;
}

export const appColors: IAppColors = {
    white: '#fff',
    darkWhite: '#fafafa',
    weekWhite: '#f4f4f4',
    black: '#111',
    deepBlack: '#282c3d',
    grey: '#828286',
    lightGrey: '#ceced0',
    weakGrey: '#c2c2c4',
    greyBG: '#f8f8f8',
    blue: '#0894a1',
    darkBlue: '#0e7c87',
    weekBlue: '#00b2c3',
    blueTransparent: 'rgba(53, 137, 234, 0.1)',
    orange: '#ea7a35',
    red: '#eb553c',
    darkRed: '#d54d36',
    weekRed: '#f33c1d',
    green: '#008a00',
    blockDivider: '#e2e2e2',
};
