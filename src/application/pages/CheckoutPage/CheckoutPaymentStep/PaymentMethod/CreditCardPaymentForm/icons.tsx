import * as React from 'react';

/* tslint:disable */
const CardIconPath1 = 'M20.066.02H1.934C.867.02 0 .867 0 1.906v13.19c0 1.039.867 1.884 1.934 1.884h18.132c1.067 0 1.934-.845 1.934-1.884V1.905C22 .866 21.133.021 20.066.021zM1.934 1.278h18.132c.356 0 .645.282.645.628v.628H1.289v-.628c0-.346.29-.628.645-.628zM20.71 3.79v1.885H1.289V3.789h19.422zm-.645 11.934H1.934a.637.637 0 0 1-.645-.628V6.93h19.422v8.165c0 .346-.29.628-.645.628z';

const CardIconPath2 = 'M15.555 11.954h3.867V8.186h-3.867v3.768zm1.289-2.512h1.289v1.256h-1.29V9.442z';

const CardIconPath3 = 'M15.555 13.211h3.867v1.256h-3.867z';

const CardIconPath4 = 'M2.621 11.954h11.645V8.186H2.62v3.768zm1.29-2.512h9.066v1.256H3.91V9.442z';


/* tslint:enable */
export const CardIcon: React.SFC = () => (
    <svg width="22" height="17" viewBox="0 0 22 17">
        <g fill="#CECED0" fillRule="evenodd">
            <path fillRule="nonzero" d={ CardIconPath1 }/>
            <path fillRule="nonzero" d={ CardIconPath2 }/>
            <path d={ CardIconPath3 }/>
            <path fillRule="nonzero" d={ CardIconPath4 }/>
        </g>
    </svg>
);
