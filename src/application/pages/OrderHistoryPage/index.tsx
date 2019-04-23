import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { withStyles, Grid } from '@material-ui/core';
import { CustomerPageTitle } from '@application/components/CustomerPageTitle';
import { EmptyOrder } from '@application/pages/OrderDetailsPage/EmptyOrder';
import { OrderList } from './OrderList';
import { IOrderHistoryPageProps as Props } from './types';
import { styles } from './styles';

@connect
class OrderHistoryPageBase extends React.Component<Props> {
    public render() {
        const {classes, isHasOrders, isFulfilled, orders} = this.props;

        return (
            <>
                <FormattedMessage id={'orders.history.title'} />
                <OrderList />
            </>
        );
    }
}

export const OrderHistoryContainer = withStyles(styles)(OrderHistoryPageBase);
