import * as React from 'react';

/* tslint:disable */
const path_1 = 'M20.83 6h-1.305l-4.3-5.126a.5.5 0 1 1 .765-.643L20.83 6zM6.475 6H5.169L10.01.231a.5.5 0 0 1 .767.643L6.475 6z';
const path_2 = 'M22.8 20.825c-.185.967-.95 1.675-1.87 1.675H5.07c-.92 0-1.685-.709-1.87-1.674L.743 8.288A1.5 1.5 0 0 1 2.215 6.5h21.57a1.5 1.5 0 0 1 1.472 1.788l-2.456 12.537z';

/* tslint:enable */
export const CartIcon: React.SFC = () => (
    <svg width="24" height="24" viewBox="0 0 26 23">
        <g fill="none" fillRule="evenodd">
            <path fill="#000" d={path_1}/>
            <path stroke="#000" d={path_2}/>
            <g fill="#000" transform="translate(9.5 11)">
                <rect width="1" height="7" rx=".5"/>
                <rect width="1" height="7" x="6" rx=".5"/>
                <rect width="1" height="7" x="3" rx=".5"/>
            </g>
        </g>
    </svg>
);
