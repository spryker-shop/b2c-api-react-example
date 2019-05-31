import * as React from 'react';

/* tslint:disable */
const path1: string = 'M0 0h24v24H0V0z';

const path2: string = 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z';

/* tslint:enable */
export const CloseOutlinedIcon: React.FC = (): JSX.Element => (
    <svg viewBox="0 0 24 24">
        <path fill="none" d={ path1 } />
        <path d={ path2 } />
    </svg>
);
