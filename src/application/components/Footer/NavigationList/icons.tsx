import * as React from 'react';

/* tslint:disable */
const path: string = 'M1 12 L16 26 L31 12 L27 8 L16 18 L5 8 z';

/* tslint:enable */
export const ChevronIcon: React.FC = (): JSX.Element => (
    <svg viewBox="0 0 32 32">
        <path d={ path } />
    </svg>
);
