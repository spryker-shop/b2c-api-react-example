import * as React from 'react';

/* tslint:disable */
const PhoneIconPath = 'M12 1.5c5.79 0 10.5 4.71 10.5 10.5S17.79 22.5 12 22.5 1.5 17.79 1.5 12 6.21 1.5 12 1.5zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.69 16.012l-.068-.205c-.157-.471-.68-.964-1.16-1.095l-1.773-.485c-.48-.13-1.166.046-1.52.398l-.64.642a6.814 6.814 0 0 1-4.792-4.793l.641-.642c.352-.352.528-1.037.397-1.52L9.292 6.54c-.13-.48-.626-1.002-1.098-1.16l-.202-.068c-.473-.158-1.148 0-1.5.355l-.96.961c-.172.17-.282.656-.282.66A11.333 11.333 0 0 0 16.688 18.75c.015 0 .518-.107.69-.278l.96-.961c.35-.352.509-1.027.352-1.499z';

/* tslint:enable */
export const BurgerIcon: React.SFC = (props): JSX.Element => (
    <svg viewBox="0 0 26 20">
        <g fillRule="evenodd">
            <rect width="100%" height="13%" rx="1.304" />
            <rect width="100%" height="13%" y="8.696" rx="1.304" />
            <rect width="100%" height="13%" y="17.391" rx="1.304" />
        </g>
    </svg>
);

export const PhoneIcon: React.SFC = (props): JSX.Element => (
    <svg viewBox="0 0 24 24">
        <path fillRule="nonzero" d={ PhoneIconPath } />
    </svg>
);
