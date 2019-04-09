import * as React from 'react';

export interface IAppFixedDimensions {
    borderRadius: React.CSSProperties['borderRadius'];
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
    customerSubPageWidth: React.CSSProperties['width'];
}

export const appFixedDimensions: IAppFixedDimensions = {
    borderRadius: 4,
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
    customerSubPageWidth: 740
};
