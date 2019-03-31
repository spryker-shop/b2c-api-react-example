import * as React from 'react';
import { appColors } from '@theme/properties/new/appColors';
import { appBreakpoints } from '@theme/properties/overwritten/appBreakpoints';

interface IAppTypographyElements {
    fontSize?: React.CSSProperties['fontSize'];
    fontWeight?: React.CSSProperties['fontWeight'];
    lineHeight?: React.CSSProperties['lineHeight'];
    letterSpacing?: React.CSSProperties['letterSpacing'];
    marginLeft?: React.CSSProperties['marginLeft'];
    color?: React.CSSProperties['color'];
}

export interface IAppTypography {
    fontFamily: React.CSSProperties['fontFamily'];
    display4: IAppTypographyElements;
    display3: IAppTypographyElements;
    display2: IAppTypographyElements;
    display1: IAppTypographyElements;
    headline: IAppTypographyElements;
    subheading: IAppTypographyElements;
    body1: IAppTypographyElements;
}

export const appTypographyStyles: IAppTypography = {
    fontFamily: [
        'Circular',
        'Segoe UI',
        'Roboto',
    ].join(','),
    display4: {
        fontSize: 30,
        lineHeight: 1.33,
        letterSpacing: 0.3,
        fontWeight: 700,
        marginLeft: 0,
        color: appColors.black,
        [`@media (min-width: ${appBreakpoints.values.md}px)`]: {
            fontSize: 30,
            lineHeight: 1.33,
            letterSpacing: 0.3,
        },
        [`@media (min-width: ${appBreakpoints.values.lg}px)`]: {
            fontSize: 40,
            lineHeight: 1.25,
            letterSpacing: 0.4,
        }
    },
    display3: {
        fontSize: 30,
        fontWeight: 700,
        lineHeight: 1.67,
        letterSpacing: 0.3,
        marginLeft: 0,
        color: appColors.black
    },
    display2: {
        fontSize: 20,
        fontWeight: 500,
        lineHeight: 1.4,
        letterSpacing: 0,
        marginLeft: 0,
        color: appColors.black
    },
    display1: {
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 1.4,
        letterSpacing: 0.2,
        marginLeft: 0,
        color: appColors.black
    },
    headline: {
        fontSize: 15,
        fontWeight: 500,
        lineHeight: 1.47,
        letterSpacing: 0.2,
        marginLeft: 0,
        color: appColors.black
    },
    subheading: {
        fontSize: 15,
        fontWeight: 400,
        lineHeight: 1.47,
        letterSpacing: 0.2,
        marginLeft: 0,
        color: appColors.black
    },
    body1: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.78,
        letterSpacing: 0.1,
        marginLeft: 0,
        color: appColors.black,
        [`@media (min-width: ${appBreakpoints.values.md}px)`]: {
            fontSize: 14,
            letterSpacing: 0.1,
        },
        [`@media (min-width: ${appBreakpoints.values.lg}px)`]: {
            fontSize: 18,
            letterSpacing: 0.1,
        }
    }
};
