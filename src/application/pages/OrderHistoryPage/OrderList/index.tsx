import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import { formatDateToString, formattedDate } from '@helpers/common/dates';
import { appFixedDimensions } from '@theme/properties/new/appFixedDimensions';
import { pathOrderDetailsPageBase } from '@constants/routes';
import { AppPrice } from '@application/components/AppPrice';
import { AppTable } from '@application/components/AppTable';
import { IOrderListProps as Props } from '@application/pages/OrderHistoryPage/OrderList/types';
import { IOrderItem } from '@interfaces/order';
import { ICellInfo, ITableRow } from '@application/components/AppTable/types';
import { styles } from './styles';
import { Grid } from '@material-ui/core';

class OrderListBase extends React.Component<Props> {
    public render = (): JSX.Element => {
        const { classes, orders } = this.props;

        const headerCellPart = 'header-';
        const rowPart = 'order-';

        const headerCells: ICellInfo[] = [
            { id: `${ headerCellPart }1`, content: <FormattedMessage id={ 'order.id.title' } /> },
            { id: `${ headerCellPart }2`, content: <FormattedMessage id={ 'orders.date.title' } /> },
            { id: `${ headerCellPart }3`, content: <FormattedMessage id={ 'orders.total.title' } /> },
            { id: `${ headerCellPart }4`, content: '' }
        ];

        const bodyRows: ITableRow[] = orders.map((order: IOrderItem) => {
            const date = formattedDate(order.dateCreated);

            return {
                id: `${ rowPart }${ order.id }`,
                cells: [
                    { id: `id-${ order.id }`, content: `#${ order.id }` },
                    { id: `date-${ order.id }`, content: formatDateToString(new Date(date)) },
                    {
                        id: `price-${ order.id }`,
                        content: <AppPrice
                            value={ order.totals.grandTotal }
                            specificCurrency={ order.currency }
                            extraClassName={ classes.price }
                            isStylesInherited={ true }
                        />
                    },
                    {
                        id: `actions-${ order.id }`,
                        content: <NavLink
                            to={ `${ pathOrderDetailsPageBase }/${ order.id }` }
                            className={ classes.orderBtn }
                        >
                            <FormattedMessage id={ 'orders.view.order.title' } />
                        </NavLink>
                    }
                ],
                ddd: (
                    <div key={`id-${ order.id }`} className={ classes.orderItem }>
                        <Grid container spacing={ 8 }>
                            <Grid item>

                            </Grid>
                        </Grid>
                    </div>
                )
            };
        });

        return (
            <div className={ classes.orderList }>
                <AppTable
                    headerCells={ headerCells }
                    bodyRows={ bodyRows }
                    isResponsive={ true }
                    width={ appFixedDimensions.customerSubPageWidth }
                />
            </div>
        );
    };
}

export const OrderList = withStyles(styles)(OrderListBase);
