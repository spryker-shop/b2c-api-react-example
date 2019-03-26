import * as React from 'react';
import { appColors } from '@theme/properties/new/appColors';

/* tslint:disable */

const path = 'M21.46 15.553a12.615 12.615 0 0 0-4.777-2.868c2.627-1.723 3.774-4.881 2.831-7.791C18.571 1.984 15.757 0 12.572 0s-6 1.984-6.942 4.894c-.944 2.91.204 6.068 2.83 7.791C3.399 14.367.004 18.93 0 24.055h1.963c.1-5.533 4.82-9.969 10.606-9.969s10.505 4.436 10.605 9.97h1.963c.01-3.19-1.314-6.253-3.677-8.503zm-8.89-3.521c-2.928 0-5.302-2.27-5.302-5.072 0-2.8 2.374-5.071 5.302-5.071 2.928 0 5.302 2.27 5.302 5.071-.003 2.8-2.375 5.068-5.302 5.072z';

/* tslint:enable */

export const UserIcon: React.SFC = () => (
    <svg width="26" height="25" viewBox="0 0 26 25">
        <path fill={ appColors.grey } fillRule="nonzero" d={ path } />
    </svg>
);
