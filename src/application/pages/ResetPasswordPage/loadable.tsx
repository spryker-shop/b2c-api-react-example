import * as React from 'react';

export const LoadablePasswordResetPage = React.lazy(() =>
    import('@pages/ResetPasswordPage').then(module => ({ default: module.ResetPasswordPage }))
);
