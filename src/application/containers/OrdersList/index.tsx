import * as React from 'react';
import { connect } from './connect';
import { NavLink } from 'react-router-dom';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { withStyles, Grid, Typography, Tooltip } from '@material-ui/core';
import { pathOrderDetailsPageBase } from '@constants/routes';
import { AppPrice } from '@components/AppPrice';
import { IOrdersListProps as Props } from './types';
import { ViewIcon } from './icons';
import { styles } from './styles';
import { Preloader } from '@components/Preloader';
import { DateFormatter } from '@components/DateFormatter';

@connect
class OrdersListComponent extends React.Component<Props> {
    public static defaultProps = {
        shouldShowEmptyList: true,
        shouldShowOrdersAmount: true,
        ordersLimit: Infinity
    };

    public componentDidMount = (): void => {
        const { getOrdersCollection, isInitiated } = this.props;

        if (!isInitiated) {
            getOrdersCollection();
        }
    };

    protected renderOrderItems = (): JSX.Element[] => {
        const { classes, orders, ordersLimit } = this.props;

        if (!Boolean(orders.length)) {
            return null;
        }

        return orders.map((order, index) => {
            if (index + 1 <= ordersLimit) {
                return (
                    <div className={ classes.orderItem } key={ `id-${ order.id }` }>
                        <Grid container spacing={ 8 }>
                            <Grid item xs={ 3 }>
                                <span className={ `${ classes.orderText } ${ classes.orderTitle }` }>
                                    <FormattedMessage id={ 'order.id.title' } />
                                </span>
                                <span className={ classes.orderText }>{ order.id }</span>
                            </Grid>
                            <Grid item xs={ 4 }>
                                <span className={ `${ classes.orderText } ${ classes.orderTitle }` }>
                                    <FormattedMessage id={ 'orders.date.title' } />
                                </span>
                                <span className={ classes.orderText }>
                                    <DateFormatter date={ order.dateCreated } />
                                </span>
                            </Grid>
                            <Grid item xs={ 3 }>
                                <span className={ `${ classes.orderText } ${ classes.orderTitle }` }>
                                    <FormattedMessage id={ 'orders.total.title' } />
                                </span>
                                <span className={ classes.orderText }>
                                    <AppPrice
                                        value={ order.totals.grandTotal }
                                        specificCurrency={ order.currency }
                                        isStylesInherited
                                    />
                                </span>
                            </Grid>
                            <Grid item xs={ 2 }>
                                <div className={ classes.actions }>
                                    <Tooltip
                                        title={
                                            <>
                                                <FormattedMessage id={ 'orders.view.order.title' } />
                                                <span className={ classes.tooltipArrow } />
                                            </>
                                        }
                                        placement="top"
                                        classes={ { tooltip: classes.tooltipWrapper } }
                                    >
                                        <NavLink
                                            to={ `${ pathOrderDetailsPageBase }/${ order.id }` }
                                            className={ classes.viewLink }
                                        >
                                            <span className={ classes.viewIcon }>
                                                <ViewIcon />
                                            </span>
                                        </NavLink>
                                    </Tooltip>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                );
            }
        });
    };

    public render = (): JSX.Element => {
        const { classes, isFulfilled, isHasOrders, shouldShowOrdersAmount, orders } = this.props;

        if (!isFulfilled) {
            return <Preloader isStatic />;
        }

        return (
            <>
                { isFulfilled &&
                    <>
                        { !isHasOrders
                            ? (
                                <Typography component="h3" variant="h3">
                                    <FormattedMessage id={'no.order.message'} />
                                </Typography>
                            )
                            : (
                                <div className={ classes.orderList }>
                                    { shouldShowOrdersAmount &&
                                        <Typography component="span" variant="h5" className={ classes.amount }>
                                            {`${orders.length} `}
                                            <FormattedPlural
                                                value={ orders.length }
                                                one={ <FormattedMessage id={ 'word.order.title' } /> }
                                                other={ <FormattedMessage id={ 'word.orders.title' } /> }
                                            />
                                        </Typography>
                                    }
                                    { this.renderOrderItems() }
                                </div>
                            )
                        }
                    </>

                }
            </>
        );
    };
}

export const OrdersList = withStyles(styles)(OrdersListComponent);
