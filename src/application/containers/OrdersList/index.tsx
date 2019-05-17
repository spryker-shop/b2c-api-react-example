import * as React from 'react';
import { connect } from './connect';
import { NavLink } from 'react-router-dom';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { withStyles, Grid, Typography, Tooltip, Button } from '@material-ui/core';
import { pathCheckoutPage, pathOrderDetailsPageBase } from '@constants/routes';
import { AppPrice } from '@components/AppPrice';
import { IOrdersListProps as Props } from './types';
import { ViewIcon } from './icons';
import { styles } from './styles';
import { Preloader } from '@components/Preloader';
import { DateFormatter } from '@components/DateFormatter';
import { DeleteIcon } from '@pages/WishlistPage/WishlistsList/WishlistsListItem/icons';

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
                            <Grid item xs={ 12 } lg={ 3 } className={ classes.col }>
                                <span className={ `${ classes.orderText } ${ classes.orderTitle }` }>
                                    <FormattedMessage id={ 'order.id.title' } />
                                </span>
                                <span className={ classes.orderText }>{ order.id }</span>
                            </Grid>
                            <Grid item xs={ 12 } lg={ 5 } className={ classes.col }>
                                <span className={ `${ classes.orderText } ${ classes.orderTitle }` }>
                                    <FormattedMessage id={ 'orders.date.title' } />
                                </span>
                                <span className={ classes.orderText }>
                                    <DateFormatter date={ order.dateCreated } />
                                </span>
                            </Grid>
                            <Grid item xs={ 12 } lg={ 4 } className={ classes.col }>
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
                        </Grid>
                        <div className={ classes.actions }>
                            <div className={ classes.actionItem }>
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
                                    <Button
                                        className={ classes.actionButton }
                                        variant="outlined"
                                        fullWidth
                                        component={ ({ innerRef, ...props }) =>
                                            <NavLink
                                                { ...props }
                                                to={`${ pathOrderDetailsPageBase }/${ order.id }`}
                                            />
                                        }
                                    >
                                            <span className={ classes.actionIcon }>
                                                <ViewIcon />
                                            </span>
                                        <span className={ classes.actionText }>
                                                <FormattedMessage id={ 'view.title' } />
                                            </span>
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
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
