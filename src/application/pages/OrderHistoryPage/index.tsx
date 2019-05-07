import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import { OrdersList } from '@containers/OrdersList';
import { IOrderHistoryPageProps as Props } from './types';
import { styles } from './styles';
import { ErrorBoundary } from '@hoc/ErrorBoundary';

const OrderHistoryPageComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes } = props;

    return (
        <>
            <Typography component="h2" variant="h2" className={classes.title}>
                <FormattedMessage id={'orders.history.title'} />
            </Typography>
            <ErrorBoundary>
                <OrdersList />
            </ErrorBoundary>
        </>
    );
};

export const OrderHistoryPage = withStyles(styles)(OrderHistoryPageComponent);
