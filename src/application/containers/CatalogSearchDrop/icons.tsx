import * as React from 'react';
import { appColors } from '@theme/properties/new/appColors';

/* tslint:disable */
const pathSeacrh = 'M20 10a10 10 0 1 0-3.68 7.74l6.3 6.26L24 22.62l-6.26-6.26A10 10 0 0 0 20 10zm-10 8a8 8 0 1 1 0-16 8 8 0 0 1 0 16z';

const pathCross1 = 'M0 1.468L1.468 0 16 14.532 14.532 16z';
const pathCross2 = 'M0 14.532L14.532 0 16 1.468 1.468 16z';


/* tslint:enable */
export const SearchIcon: React.SFC = (props): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill={ appColors.grey } fillRule="nonzero" d={ pathSeacrh } />
    </svg>
);

export const CrossIcon: React.SFC = (props): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <g fill={ appColors.grey } fillRule="evenodd">
            <path d={ pathCross1 } />
            <path d={ pathCross2 } />
        </g>
    </svg>
);
