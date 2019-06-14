import * as React from 'react';

/* tslint:disable */
const EditIconPath: string = 'M11.934.198a.603.603 0 0 0-.356.173l-10.4 10.272a.59.59 0 0 0-.162.284l-1 4.346a.6.6 0 0 0 .16.551.617.617 0 0 0 .558.158l4.4-.987a.602.602 0 0 0 .294-.16l10.4-10.272a.61.61 0 0 0 0-.834l-3.4-3.358a.604.604 0 0 0-.494-.173zM12 1.628l2.552 2.52-1.152 1.14-2.548-2.523L12 1.628zm-2 1.975l2.552 2.52L5.2 13.387l-2.548-2.523L10 3.603zm-7.98 8.314l2.12 2.092-2.74.608.62-2.7z';

/* tslint:enable */
export const EditIcon: React.FC = (): JSX.Element => (
    <svg viewBox="0 0 16 16">
        <path fillRule="nonzero" d={ EditIconPath }/>
    </svg>
);
