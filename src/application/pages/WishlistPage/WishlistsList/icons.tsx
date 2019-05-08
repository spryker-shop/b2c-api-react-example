import * as React from 'react';

/* tslint:disable */

const SaveIconPath1 = 'M0 0h24v24H0z';
const SaveIconPath2 = 'M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z';

/* tslint:enable */

export const SaveIcon: React.SFC = () => (
    <svg viewBox="0 0 24 24">
        <path fill="none" d={ SaveIconPath1 } />
        <path d={ SaveIconPath2 } />
    </svg>
);
