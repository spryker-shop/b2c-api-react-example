import * as React from 'react';
import { connect } from './connect';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { withStyles, Grid, Typography } from '@material-ui/core';
import { formatDateToString, formattedDate } from '@helpers/common/dates';
import { pathOrderDetailsPageBase } from '@constants/routes';
import { AppPrice } from '@application/components/AppPrice';
import { IOrderListProps as Props } from '@application/pages/OrderHistoryPage/OrderList/types';
import { ViewIcon } from './icons';
import { styles } from './styles';
import { EmptyOrder } from '@pages/OrderDetailsPage/EmptyOrder';

@connect
class OrderListComponent extends React.Component<Props> {
    public componentDidMount = (): void => {
        this.props.getOrdersCollection();
    };

    protected renderOrderItems = (): JSX.Element[] => {
        const { classes, orders } = this.props;

        return orders.map(order => {
            const date = formattedDate(order.dateCreated);
            const renderDate = formatDateToString(new Date(date));

            return (
                <div className={ classes.orderItem } key={`id-${ order.id }`}>
                    <Grid container spacing={ 8 }>
                        <Grid item xs={ 3 }>
                            <span className={`${classes.orderText} ${classes.orderTitle}`}>
                                <FormattedMessage id={ 'order.id.title' } />
                            </span>
                            <span className={ classes.orderText }>{ order.id }</span>
                        </Grid>
                        <Grid item xs={ 3 }>
                            <span className={`${classes.orderText} ${classes.orderTitle}`}>
                                <FormattedMessage id={ 'orders.date.title' } />
                            </span>
                            <span className={ classes.orderText }>{ renderDate }</span>
                        </Grid>
                        <Grid item xs={ 3 }>
                            <span className={`${classes.orderText} ${classes.orderTitle}`}>
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
                        <Grid item xs={ 3 }>
                            <div className={ classes.actions }>
                                {/*<FormattedMessage id={ 'orders.view.order.title' } />*/}
                                <NavLink to={`${pathOrderDetailsPageBase}/${order.id}`} className={ classes.viewLink }>
                                    <span className={ classes.viewIcon }>
                                        <ViewIcon />
                                    </span>
                                </NavLink>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            );
        });
    };

    public render = (): JSX.Element => {
        const { classes, isFulfilled, isHasOrders } = this.props;

        return (
            <>
                { isFulfilled &&
                    <>
                        { !isHasOrders
                            ? (
                                <Typography component="h3" variant="display3" className={ classes.title }>
                                    <FormattedMessage id={'no.order.message'} />
                                </Typography>
                            )
                            : (
                                <div className={ classes.orderList }>
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

export const OrderList = withStyles(styles)(OrderListComponent);
