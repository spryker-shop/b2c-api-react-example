import * as React from 'react';

/* tslint:disable */
const PrevIconPath = 'M6 12L1.055 6.67 6 1.395';

const NextIconPath = 'M1 1l4.945 5.33L1 11.605';

/* tslint:enable */
export const PrevIcon = (): JSX.Element => (
    <svg width="100%" viewBox="0 0 7 13">
        <path fill="none" fillRule="evenodd" strokeWidth="1.5" d={ PrevIconPath } />
    </svg>
);

export const NextIcon = (): JSX.Element => (
    <svg width="100%" viewBox="0 0 7 13">
        <path fill="none" fillRule="evenodd" strokeWidth="1.5" d={ NextIconPath } />
    </svg>
);
