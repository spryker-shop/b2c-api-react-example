import * as React from 'react';

/* tslint:disable */
const CalendarIconPath1: string = 'M17.656 1.563h-.937V0h-1.563v1.563H4.844V0H3.28v1.563h-.937A2.346 2.346 0 0 0 0 3.905v13.75A2.346 2.346 0 0 0 2.344 20h15.312A2.346 2.346 0 0 0 20 17.656V3.906a2.346 2.346 0 0 0-2.344-2.344zm.782 16.093c0 .431-.351.782-.782.782H2.344a.782.782 0 0 1-.781-.782V7.344h16.875v10.312zm0-11.875H1.563V3.906c0-.43.35-.781.78-.781h.938v1.563h1.563V3.125h10.312v1.563h1.563V3.125h.937c.431 0 .782.35.782.781v1.875z';

const CalendarIconPath2: string = 'M2.969 8.984h1.563v1.563H2.969zM6.094 8.984h1.563v1.563H6.094zM9.219 8.984h1.563v1.563H9.219zM12.344 8.984h1.563v1.563h-1.563zM15.469 8.984h1.563v1.563h-1.563zM2.969 12.109h1.563v1.563H2.969zM6.094 12.109h1.563v1.563H6.094zM9.219 12.109h1.563v1.563H9.219zM12.344 12.109h1.563v1.563h-1.563zM2.969 15.234h1.563v1.563H2.969zM6.094 15.234h1.563v1.563H6.094zM9.219 15.234h1.563v1.563H9.219zM12.344 15.234h1.563v1.563h-1.563zM15.469 12.109h1.563v1.563h-1.563z';


/* tslint:enable */
export const CalendarIcon: React.FC = (): JSX.Element => (
    <svg width="100%" viewBox="0 0 20 20">
        <g fillRule="evenodd">
            <path fillRule="nonzero" d={ CalendarIconPath1 } />
            <path d={ CalendarIconPath2 } />
        </g>
    </svg>
);
