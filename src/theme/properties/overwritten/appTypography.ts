import * as React from 'react';

export interface IAppTypography {
    fontFamily: React.CSSProperties['fontFamily'];
}

export const appTypographyStyles: IAppTypography = {
    fontFamily: [
        'Circular',
        'Segoe UI',
        'Roboto',
    ].join(','),
};
