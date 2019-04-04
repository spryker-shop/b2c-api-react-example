import * as React from 'react';

/* tslint:disable */
const LeftIconPath = 'M6 12L1.055 6.67 6 1.395';

const RightIconPath = 'M1 1l4.945 5.33L1 11.605';

const BottomIconPath = 'M12 1L6.471 6 1 1';

const TopIconPath = 'M1 6l5.529-5L12 6';

/* tslint:enable */
export const LeftIcon = (): JSX.Element => (
    <svg width="100%" viewBox="0 0 7 13">
        <path fill="none" fillRule="evenodd" strokeWidth="1.5" d={ LeftIconPath } />
    </svg>
);

export const RightIcon = (): JSX.Element => (
    <svg width="100%" viewBox="0 0 7 13">
        <path fill="none" fillRule="evenodd" strokeWidth="1.5" d={ RightIconPath } />
    </svg>
);

export const BottomIcon = (): JSX.Element => (
    <svg width="100%" viewBox="0 0 13 7">
        <path fill="none" fillRule="evenodd" strokeWidth="1.5" d={ BottomIconPath } />
    </svg>
);

export const TopIcon = (): JSX.Element => (
    <svg width="100%" viewBox="0 0 13 7">
        <path fill="none" fillRule="evenodd" strokeWidth="1.5" d={ TopIconPath }/>
    </svg>
);
