import * as React from 'react';

/* tslint:disable */
const PartnerIconVisaPath1: string = 'M17.293 12.762h-3.218L16.088.382h3.218zM28.958.685a7.967 7.967 0 0 0-2.886-.527c-3.178 0-5.416 1.686-5.43 4.096-.026 1.778 1.603 2.765 2.821 3.358 1.245.606 1.668 1.002 1.668 1.542-.013.829-1.006 1.211-1.932 1.211-1.285 0-1.973-.197-3.02-.658l-.423-.198-.45 2.779c.754.342 2.145.645 3.588.659 3.377 0 5.575-1.66 5.6-4.228.014-1.41-.846-2.49-2.7-3.372-1.126-.566-1.815-.948-1.815-1.528.013-.526.583-1.066 1.854-1.066a5.492 5.492 0 0 1 2.397.474l.29.131.438-2.673z';

const PartnerIconVisaPath2: string = 'M33.235 8.377l1.285-3.464c-.014.026.264-.725.423-1.185l.225 1.066s.61 2.964.742 3.583h-2.675zM37.207.382h-2.489c-.767 0-1.35.224-1.682 1.028l-4.78 11.352h3.377l.675-1.857h4.132c.092.435.384 1.857.384 1.857h2.98L37.206.382z';

const PartnerIconVisaPath3: string = 'M11.387.382L8.236 8.824l-.344-1.712c-.583-1.975-2.41-4.122-4.45-5.189L6.33 12.749h3.403L14.79.382h-3.403z';

const PartnerIconVisaPath4: string = 'M5.31.382H.132L.08.632c4.04 1.028 6.714 3.504 7.813 6.48L6.766 1.424C6.581.633 6.011.41 5.31.383z';

/* tslint:enable */
export const PartnerIconVisa: React.FC = (): JSX.Element => (
    <svg width="40" height="13" viewBox="0 0 40 13">
        <g fillRule="evenodd">
            <path d={ PartnerIconVisaPath1 } />
            <path fillRule="nonzero" d={ PartnerIconVisaPath2 } />
            <path d={ PartnerIconVisaPath3 } />
            <path d={ PartnerIconVisaPath4 } />
        </g>
    </svg>
);
