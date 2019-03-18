import * as React from 'react';

/* tslint:disable */
const CheckIconPath = `M1 5l4 3 6-7`;

/* tslint:enable */
export const CheckIcon: React.SFC = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 12 9">
        <path fill="none" fill-rule="evenodd" stroke="#fff" stroke-width="1.5" d={ CheckIconPath } />
    </svg>
);
