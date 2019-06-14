import * as React from 'react';

export const LoadablePasswordForgotPage = React.lazy(() =>
    import('@pages/ForgotPasswordPage').then(module => ({ default: module.ForgotPasswordPage }))
);
