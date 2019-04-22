import * as React from 'react';
import { appColors } from '@theme/properties/new/appColors';

/* tslint:disable */
const PrevIconPath = 'M6 12L1.055 6.67 6 1.395';

/* tslint:enable */
export const PrevIcon = (): JSX.Element => (
    <svg viewBox="0 0 7 13">
        <path fill="none" fillRule="evenodd" strokeWidth="1.5" d={ PrevIconPath } />
    </svg>
);
