import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { withStyles, Grid } from '@material-ui/core';
import { formatDateToString, formattedDate } from '@helpers/common/dates';
import { pathOrderDetailsPageBase } from '@constants/routes';
import { AppPrice } from '@application/components/AppPrice';
import { IOrderListProps as Props } from '@application/pages/OrderHistoryPage/OrderList/types';
import { styles } from './styles';

class OrderListComponent extends React.Component<Props> {
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
                            <NavLink
                                to={ `${ pathOrderDetailsPageBase }/${ order.id }` }
                                className={ classes.orderBtn }
                            >
                                <FormattedMessage id={ 'orders.view.order.title' } />
                            </NavLink>
                        </Grid>
                    </Grid>
                </div>
            );
        });
    };

    public render = (): JSX.Element => {
        const { classes } = this.props;

        return (
            <div className={ classes.orderList }>
                { this.renderOrderItems() }
            </div>
        );
    };
}

export const OrderList = withStyles(styles)(OrderListComponent);
