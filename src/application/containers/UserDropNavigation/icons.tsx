import * as React from 'react';

/* tslint:disable */

const path = 'M1 22c0-4.98 5.807-8.5 12.5-8.5S26 17.02 26 22v.5H1V22zM13.5.5C17.083.5 20 3.416 20 7c0 3.585-2.916 6.5-6.5 6.5A6.506 6.506 0 0 1 7 7C7 3.416 9.915.5 13.5.5z';

/* tslint:enable */

export const UserIcon: React.SFC = () => (
    <svg width={24} height={24} viewBox="0 0 27 22">
        <g fill="none" fillRule="evenodd" stroke="#000">
            <path d={path}/>
        </g>
    </svg>
);
