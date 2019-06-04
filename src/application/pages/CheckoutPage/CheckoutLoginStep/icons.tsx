import * as React from 'react';

/* tslint:disable */

const LockIconPath: string = 'M1.393 15.612h10.214V7.748H1.393v7.864zM3.018 4.903c0-1.942 1.555-3.515 3.482-3.515 1.927 0 3.482 1.573 3.482 3.515v1.458H3.018V4.903zM1.393 17h10.214c.766 0 1.393-.624 1.393-1.388V7.748c0-.763-.627-1.387-1.393-1.387h-.232V4.903C11.375 2.197 9.193 0 6.5 0S1.625 2.197 1.625 4.903v1.458h-.232C.627 6.36 0 6.985 0 7.748v7.864C0 16.376.627 17 1.393 17zm4.41-3.238h1.393v-2.776H5.804v2.776z';

/* tslint:enable */
export const LockIcon: React.FC = (): JSX.Element => (
    <svg viewBox="0 0 13 17">
        <path fillRule="evenodd" d={ LockIconPath }/>
    </svg>
);
