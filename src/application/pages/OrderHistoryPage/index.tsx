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
    public componentDidMount = (): void => {
        if (!this.props.isLoading && this.props.isAppDataSet) {
            this.props.getOrdersCollection();
        }
    };

    public componentDidUpdate = (prevProps: Props): void => {
        if (this.props.isRejected || this.props.isLoading || !this.props.isAppDataSet) {
            return;
        }

        if (!this.props.isFulfilled && !prevProps.isHasOrders) {
            this.props.getOrdersCollection();
        }
    };

    public render() {
        const {classes, isHasOrders, isFulfilled, orders} = this.props;

        return (
            <div>
                {isFulfilled &&
                    <div className={classes.root}>
                        <Grid container justify="center">
                            <Grid item xs={12}>
                                <CustomerPageTitle
                                    title={<FormattedMessage id={'orders.history.title'} />}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            {isHasOrders
                                ? <Grid item xs={12}>
                                    <OrderList orders={orders} />
                                </Grid>
                                : <EmptyOrder intro={<FormattedMessage id={'no.order.message'} />} />
                            }
                        </Grid>
                    </div>
                }
            </div>
        );
    }
}

export const OrderHistoryContainer = withStyles(styles)(OrderHistoryPageBase);
