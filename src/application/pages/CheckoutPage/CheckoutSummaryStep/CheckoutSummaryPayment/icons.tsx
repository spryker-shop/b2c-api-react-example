import * as React from 'react';

/* tslint:disable */
const PartnerIconVisaPath1: string = 'M17.293 12.762h-3.218L16.088.382h3.218zM28.958.685a7.967 7.967 0 0 0-2.886-.527c-3.178 0-5.416 1.686-5.43 4.096-.026 1.778 1.603 2.765 2.821 3.358 1.245.606 1.668 1.002 1.668 1.542-.013.829-1.006 1.211-1.932 1.211-1.285 0-1.973-.197-3.02-.658l-.423-.198-.45 2.779c.754.342 2.145.645 3.588.659 3.377 0 5.575-1.66 5.6-4.228.014-1.41-.846-2.49-2.7-3.372-1.126-.566-1.815-.948-1.815-1.528.013-.526.583-1.066 1.854-1.066a5.492 5.492 0 0 1 2.397.474l.29.131.438-2.673z';

const PartnerIconVisaPath2: string = 'M33.235 8.377l1.285-3.464c-.014.026.264-.725.423-1.185l.225 1.066s.61 2.964.742 3.583h-2.675zM37.207.382h-2.489c-.767 0-1.35.224-1.682 1.028l-4.78 11.352h3.377l.675-1.857h4.132c.092.435.384 1.857.384 1.857h2.98L37.206.382z';

const PartnerIconVisaPath3: string = 'M11.387.382L8.236 8.824l-.344-1.712c-.583-1.975-2.41-4.122-4.45-5.189L6.33 12.749h3.403L14.79.382h-3.403z';

const PartnerIconVisaPath4: string = 'M5.31.382H.132L.08.632c4.04 1.028 6.714 3.504 7.813 6.48L6.766 1.424C6.581.633 6.011.41 5.31.383z';

const CardIconPath1: string = 'M20.066.02H1.934C.867.02 0 .867 0 1.906v13.19c0 1.039.867 1.884 1.934 1.884h18.132c1.067 0 1.934-.845 1.934-1.884V1.905C22 .866 21.133.021 20.066.021zM1.934 1.278h18.132c.356 0 .645.282.645.628v.628H1.289v-.628c0-.346.29-.628.645-.628zM20.71 3.79v1.885H1.289V3.789h19.422zm-.645 11.934H1.934a.637.637 0 0 1-.645-.628V6.93h19.422v8.165c0 .346-.29.628-.645.628z';

const CardIconPath2: string = 'M15.555 11.954h3.867V8.186h-3.867v3.768zm1.289-2.512h1.289v1.256h-1.29V9.442z';

const CardIconPath3: string = 'M15.555 13.211h3.867v1.256h-3.867z';

const CardIconPath4: string = 'M2.621 11.954h11.645V8.186H2.62v3.768zm1.29-2.512h9.066v1.256H3.91V9.442z';

const CalendarIconPath1: string = 'M17.656 1.563h-.937V0h-1.563v1.563H4.844V0H3.28v1.563h-.937A2.346 2.346 0 0 0 0 3.905v13.75A2.346 2.346 0 0 0 2.344 20h15.312A2.346 2.346 0 0 0 20 17.656V3.906a2.346 2.346 0 0 0-2.344-2.344zm.782 16.093c0 .431-.351.782-.782.782H2.344a.782.782 0 0 1-.781-.782V7.344h16.875v10.312zm0-11.875H1.563V3.906c0-.43.35-.781.78-.781h.938v1.563h1.563V3.125h10.312v1.563h1.563V3.125h.937c.431 0 .782.35.782.781v1.875z';

const CalendarIconPath2: string = 'M2.969 8.984h1.563v1.563H2.969zM6.094 8.984h1.563v1.563H6.094zM9.219 8.984h1.563v1.563H9.219zM12.344 8.984h1.563v1.563h-1.563zM15.469 8.984h1.563v1.563h-1.563zM2.969 12.109h1.563v1.563H2.969zM6.094 12.109h1.563v1.563H6.094zM9.219 12.109h1.563v1.563H9.219zM12.344 12.109h1.563v1.563h-1.563zM2.969 15.234h1.563v1.563H2.969zM6.094 15.234h1.563v1.563H6.094zM9.219 15.234h1.563v1.563H9.219zM12.344 15.234h1.563v1.563h-1.563zM15.469 12.109h1.563v1.563h-1.563z';


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

export const PartnerIconVisa: React.FC = (): JSX.Element => (
    <svg width="29" height="10" viewBox="0 0 40 13">
        <g fillRule="evenodd">
            <path d={ PartnerIconVisaPath1 } />
            <path fillRule="nonzero" d={ PartnerIconVisaPath2 } />
            <path d={ PartnerIconVisaPath3 } />
            <path d={ PartnerIconVisaPath4 } />
        </g>
    </svg>
);
