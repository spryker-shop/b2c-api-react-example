import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { withStyles, Grid } from '@material-ui/core';
import { OrderDetailsGeneralInfo } from './OrderDetailsGeneralInfo';
import { OrderProductList } from './OrderProductsList';
import { OrderDetailsTotals } from './OrderDetailsTotals';
import { OrderAddresses } from './OrderAddresses';
import { EmptyOrder } from './EmptyOrder';
import { IOrderDetailsPageProps as Props, IOrderDetailsPageState as State } from './types';
import { styles } from './styles';

@connect
class OrderDetailsPageBase extends React.Component<Props, State> {
    public readonly state: State = {
        selectedItems: {},
        selectedItemsData: null
    };

    public componentDidMount = (): void => {
        if (!this.props.isOrderExist || (this.props.isOrderExist && this.props.orderIdParam !== this.props.order.id)) {
            this.initRequestData();
        }
    };

    public componentDidUpdate = (): void => {
        if (!this.props.isRejected && !this.props.isOrderExist) {
            this.initRequestData();
        }
    };

    protected initRequestData = (): void => {
        if (this.props.isLoading) {
            return;
        }
        if (this.props.isAppDataSet && this.props.orderIdParam) {
            this.props.getOrderData(this.props.orderIdParam as string);
        }
    };

    public render(): JSX.Element {
        const {classes, isOrderExist, isFulfilled, order} = this.props;

        return (
            <div className={classes.root}>
                {isFulfilled &&
                    <Grid container>
                        {isOrderExist
                            ? <Grid item xs={12}>
                                <OrderDetailsGeneralInfo
                                    orderId={order.id}
                                    dateOrder={order.dateCreated}
                                    priceMode={order.priceMode}
                                />
                                <OrderProductList items={order.items} />
                                <OrderDetailsTotals
                                    expenses={order.expenses}
                                    totals={order.totals}
                                />
                                <OrderAddresses
                                    billingAddress={order.billingAddress}
                                    shippingAddress={order.shippingAddress}
                                    billingBlockTitle={<FormattedMessage id={'billing.address.title'} />}
                                    shippingBlockTitle={<FormattedMessage id={'shipping.address.title'} />}
                                />
                            </Grid>
                            : <EmptyOrder intro={<FormattedMessage id={'no.order.message'} />} />
                        }
                    </Grid>
                }
            </div>
        );
    }
}

export const OrderDetailsContainer = withStyles(styles)(OrderDetailsPageBase);
