import React from 'react';
import { FormattedMessage } from 'react-intl';

export const FormattedMessageTemplate: Function = (message: string) =>
    <FormattedMessage id={ message } />;
