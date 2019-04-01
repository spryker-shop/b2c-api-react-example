import * as React from 'react';
import { appColors } from '@theme/properties/new/appColors';

/* tslint:disable */
const path = 'M1 12 L16 26 L31 12 L27 8 L16 18 L5 8 z';

const pathCross1 = 'M0 1.468L1.468 0 16 14.532 14.532 16z';
const pathCross2 = 'M0 14.532L14.532 0 16 1.468 1.468 16z';

/* tslint:enable */
export const ChevronIcon: React.SFC = (): JSX.Element => (
    <svg viewBox="0 0 32 32">
        <path d={ path } />
    </svg>
);

export const CrossIcon: React.SFC = (props): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16">
        <g fill={ appColors.grey } fillRule="evenodd">
            <path d={ pathCross1 } />
            <path d={ pathCross2 } />
        </g>
    </svg>
);
