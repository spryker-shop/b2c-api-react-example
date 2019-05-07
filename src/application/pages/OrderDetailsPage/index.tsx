import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import { OrderProductList } from './OrderProductsList';
import { OrderDetailsTotals } from './OrderDetailsTotals';
import { OrderAddresses } from './OrderAddresses';
import { EmptyOrder } from './EmptyOrder';
import { IOrderDetailsPageProps as Props, IOrderDetailsPageState as State } from './types';
import { styles } from './styles';
import { DateFormatter } from '@components/DateFormatter';

@connect
class OrderDetailsPageComponent extends React.Component<Props, State> {
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

    protected orderAmount = (): number => {
        const { order } = this.props;

        return order.items.reduce((accumulator, currentValue): number => accumulator + currentValue.quantity, 0);
    };

    public render(): JSX.Element {
        const { classes, isOrderExist, isFulfilled, order } = this.props;

        return (
            <>
                { isFulfilled &&
                    <>
                        <div className={ classes.heading }>
                            <Typography component="h2" variant="h2">
                                <FormattedMessage id={ 'order.details.title' } />
                            </Typography>
                            { isOrderExist &&
                                <span className={ classes.amount }>
                                    {`${ this.orderAmount() } `}
                                    <FormattedPlural
                                        value={ this.orderAmount() }
                                        one={ <FormattedMessage id={ 'word.item.title' } /> }
                                        other={ <FormattedMessage id={ 'word.items.title' } /> }
                                    />
                                </span>
                            }
                        </div>
                        { isOrderExist
                            ? <>
                                <div className={ classes.block }>
                                    <dl className={ classes.generalInfo }>
                                        <dt className={ classes.generalInfoTitle }>
                                            <FormattedMessage id={ 'order.detail.number.title' } />
                                        </dt>
                                        <dd className={ classes.generalInfoDescritption }>
                                            { order.id }
                                        </dd>
                                        <dt className={ classes.generalInfoTitle }>
                                            <FormattedMessage id={ 'order.detail.date.title' } />
                                        </dt>
                                        <dd className={ classes.generalInfoDescritption }>
                                            <DateFormatter date={ order.dateCreated } />
                                        </dd>
                                    </dl>
                                    <OrderProductList items={ order.items } />
                                </div>
                                <OrderDetailsTotals
                                    expenses={ order.expenses }
                                    totals={ order.totals }
                                />
                                <OrderAddresses
                                    billingAddress={ order.billingAddress }
                                    shippingAddress={ order.shippingAddress }
                                    billingBlockTitle={ <FormattedMessage id={ 'billing.address.title' } /> }
                                    shippingBlockTitle={ <FormattedMessage id={ 'shipping.address.title' } /> }
                                />
                            </>
                            : <EmptyOrder intro={ <FormattedMessage id={ 'no.order.message' } /> } />
                        }
                    </>
                }
            </>
        );
    }
}

export const OrderDetailsContainer = withStyles(styles)(OrderDetailsPageComponent);
