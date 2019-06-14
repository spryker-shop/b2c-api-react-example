import * as React from 'react';
import { appColors } from '@theme/properties/new/appColors';

/* tslint:disable */
const linkSeacrh: string = 'M3.75 0v1.667h2.7L0 8.117l1.175 1.175 6.458-6.45V5.55H9.3V0z';

/* tslint:enable */
export const LinkIcon: React.FC = (): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
        <path fill={ appColors.darkGrey } fillRule="evenodd" d={ linkSeacrh } />
    </svg>
);
