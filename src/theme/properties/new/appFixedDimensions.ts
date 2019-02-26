import * as React from 'react';
import { GridSpacing } from '@material-ui/core/Grid';
import { baseTheme } from '@theme';

export interface IAppFixedDimensions {
    card: {
        actionAreaWidth: React.CSSProperties['width'];
        actionAreaHeight: React.CSSProperties['height'];
    };
    borderRadius: React.CSSProperties['borderRadius'];
    gridSpacing: GridSpacing;
    fontSize: {
        mini: React.CSSProperties['fontSize'];
        small: React.CSSProperties['fontSize'];
        medium: React.CSSProperties['fontSize'];
        large: React.CSSProperties['fontSize'];
        big: React.CSSProperties['fontSize'];
        huge: React.CSSProperties['fontSize'];
        xl: React.CSSProperties['fontSize'];
        xxl: React.CSSProperties['fontSize'];
        xxxl: React.CSSProperties['fontSize'];
    };
    customBreakpoints: {
        tablet: number;
        smallTablet: number;
        phone: number;
    };
    customerSubPageWidth: React.CSSProperties['width'];
    sprykerLogo: {
        width: number;
        height: number;
    };
    headerHeight: {
        desktop: number;
        sticky: number;
        tablet: number;
    };
    cartDrop: {
        width: number;
        height: number;
    };
    userDrop: {
        width: number;
        height: number;
    };
    headerPopover: {
        overflow: number;
        triangle: number;
    };
}

export const appFixedDimensions: IAppFixedDimensions = {
    card: {
        actionAreaWidth: 282,
        actionAreaHeight: 428,
    },
    borderRadius: 4,
    gridSpacing: 24,
    fontSize: {
        mini: '0.69rem', // 11px
        small: '0.875rem', // 14px
        medium: '1.0rem', // 16px
        large: '1.13rem',
        big: '1.25rem', // 20px
        huge: '1.50rem', // 24px
        xl: '2.0rem', // 32px
        xxl: '2.12rem', // 34px
        xxxl: '3.5rem', // 56px
    },
    customBreakpoints: {
        tablet: 1280,
        smallTablet: 960,
        phone: 600,
    },
    customerSubPageWidth: 740,
    sprykerLogo: {
        width: 170,
        height: 60
    },
    headerHeight: {
        desktop: 148,
        sticky: 65,
        tablet: 204,
    },
    cartDrop: {
        width: 418,
        height: 550,
    },
    userDrop: {
        width: 340,
        height: 283,
    },
    headerPopover: {
        overflow: 42,
        triangle: 17,
    },
};
