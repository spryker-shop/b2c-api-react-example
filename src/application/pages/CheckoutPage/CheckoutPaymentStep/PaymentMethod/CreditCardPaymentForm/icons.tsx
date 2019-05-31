import * as React from 'react';

/* tslint:disable */
const CardIconPath1: string = 'M20.066.02H1.934C.867.02 0 .867 0 1.906v13.19c0 1.039.867 1.884 1.934 1.884h18.132c1.067 0 1.934-.845 1.934-1.884V1.905C22 .866 21.133.021 20.066.021zM1.934 1.278h18.132c.356 0 .645.282.645.628v.628H1.289v-.628c0-.346.29-.628.645-.628zM20.71 3.79v1.885H1.289V3.789h19.422zm-.645 11.934H1.934a.637.637 0 0 1-.645-.628V6.93h19.422v8.165c0 .346-.29.628-.645.628z';

const CardIconPath2: string = 'M15.555 11.954h3.867V8.186h-3.867v3.768zm1.289-2.512h1.289v1.256h-1.29V9.442z';

const CardIconPath3: string = 'M15.555 13.211h3.867v1.256h-3.867z';

const CardIconPath4: string = 'M2.621 11.954h11.645V8.186H2.62v3.768zm1.29-2.512h9.066v1.256H3.91V9.442z';

const CalendarIconPath1: string = 'M17.656 1.563h-.937V0h-1.563v1.563H4.844V0H3.28v1.563h-.937A2.346 2.346 0 0 0 0 3.905v13.75A2.346 2.346 0 0 0 2.344 20h15.312A2.346 2.346 0 0 0 20 17.656V3.906a2.346 2.346 0 0 0-2.344-2.344zm.782 16.093c0 .431-.351.782-.782.782H2.344a.782.782 0 0 1-.781-.782V7.344h16.875v10.312zm0-11.875H1.563V3.906c0-.43.35-.781.78-.781h.938v1.563h1.563V3.125h10.312v1.563h1.563V3.125h.937c.431 0 .782.35.782.781v1.875z';

const CalendarIconPath2: string = 'M2.969 8.984h1.563v1.563H2.969zM6.094 8.984h1.563v1.563H6.094zM9.219 8.984h1.563v1.563H9.219zM12.344 8.984h1.563v1.563h-1.563zM15.469 8.984h1.563v1.563h-1.563zM2.969 12.109h1.563v1.563H2.969zM6.094 12.109h1.563v1.563H6.094zM9.219 12.109h1.563v1.563H9.219zM12.344 12.109h1.563v1.563h-1.563zM2.969 15.234h1.563v1.563H2.969zM6.094 15.234h1.563v1.563H6.094zM9.219 15.234h1.563v1.563H9.219zM12.344 15.234h1.563v1.563h-1.563zM15.469 12.109h1.563v1.563h-1.563z';

const LockIconPath: string = 'M1.5 16.53h11V8.205h-11v8.327zM3.25 5.193c0-2.057 1.675-3.723 3.75-3.723s3.75 1.666 3.75 3.723v1.543h-7.5V5.192zM1.5 18h11c.825 0 1.5-.661 1.5-1.47V8.205c0-.808-.675-1.47-1.5-1.47h-.25V5.193C12.25 2.327 9.9 0 7 0S1.75 2.327 1.75 5.192v1.543H1.5c-.825 0-1.5.66-1.5 1.47v8.326C0 17.339.675 18 1.5 18zm4.75-3.429h1.5v-2.938h-1.5v2.938z';

const QuestionIconPath: string = 'M3.889 9.308H3.11c-.233 0-.389.169-.389.423v.846c0 .254.156.423.39.423h.777c.233 0 .389-.17.389-.423V9.73c0-.254-.156-.423-.39-.423zM3.5 0C1.556 0 0 1.692 0 3.808c0 .211 0 .423.039.634.039.254.272.381.505.339l.74-.254c.194-.042.31-.254.272-.465v-.254c0-1.185.855-2.116 1.944-2.116s1.944.931 1.944 2.116c0 .719-.388 1.057-1.088 1.692-.662.592-1.44 1.27-1.634 2.496a.4.4 0 0 0 .39.466h.777c.194 0 .35-.127.389-.339.116-.508.466-.846 1.05-1.311C6.067 6.177 7 5.373 7 3.808 7 1.692 5.444 0 3.5 0z';


/* tslint:enable */
export const CardIcon: React.FC = (): JSX.Element => (
    <svg width="100%" viewBox="0 0 22 17">
        <g fillRule="evenodd">
            <path fillRule="nonzero" d={ CardIconPath1 } />
            <path fillRule="nonzero" d={ CardIconPath2 } />
            <path d={ CardIconPath3 } />
            <path fillRule="nonzero" d={ CardIconPath4 } />
        </g>
    </svg>
);

export const CalendarIcon: React.FC = (): JSX.Element => (
    <svg width="100%" viewBox="0 0 20 20">
        <g fillRule="evenodd">
            <path fillRule="nonzero" d={ CalendarIconPath1 } />
            <path d={ CalendarIconPath2 } />
        </g>
    </svg>
);

export const LockIcon: React.FC = (): JSX.Element => (
    <svg width="14" height="18" viewBox="0 0 14 18">
        <path fillRule="evenodd" d={ LockIconPath } />
    </svg>
);

export const QuestionIcon: React.FC = (): JSX.Element => (
    <svg width="7" height="11" viewBox="0 0 7 11">
        <g fillRule="evenodd">
            <path d={ QuestionIconPath } />
        </g>
    </svg>
);
