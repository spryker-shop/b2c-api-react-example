import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { INotFoundPageProps as Props } from './types';
import { Typography } from '@material-ui/core';
import { MainContainer } from '@components/MainContainer';

export const NotFoundPage: React.SFC<Props> = (props): JSX.Element => (
    <MainContainer>
        <Typography component="h2" variant="h1" align="center">
            <FormattedMessage id={ 'page.not.found.message' } />
        </Typography>
    </MainContainer>
);
