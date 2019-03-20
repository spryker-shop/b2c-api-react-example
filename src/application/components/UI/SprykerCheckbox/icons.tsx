import * as React from 'react';

/* tslint:disable */
const CheckIconPath = `M1 5l4 3 6-7`;

/* tslint:enable */
export const CheckIcon: React.SFC = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 9">
        <path fill="none" fillRule="evenodd" stroke="#fff" strokeWidth="1.5" d={ CheckIconPath } />
    </svg>
);
