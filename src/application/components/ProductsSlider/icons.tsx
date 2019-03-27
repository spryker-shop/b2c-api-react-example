import * as React from 'react';

/* tslint:disable */
const PrevIconPath = 'M6 12L1.055 6.67 6 1.395';

const NextIconPath = 'M1 1l4.945 5.33L1 11.605';

/* tslint:enable */
export const PrevIcon = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13">
        <path fill="none" fillRule="evenodd" stroke="#CECED0" strokeWidth="1.5" d={ PrevIconPath } />
    </svg>
);

export const NextIcon = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13">
        <path fill="none" fillRule="evenodd" stroke="#C2C2C4" strokeWidth="1.5" d={ NextIconPath } />
    </svg>
);