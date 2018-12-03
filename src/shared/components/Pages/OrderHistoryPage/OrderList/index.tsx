import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import {styles} from './styles';
import {IOrderItem} from 'src/shared/interfaces/order';
import {
  OrdersHistoryTableHeaderDate,
  OrdersHistoryTableHeaderID,
  OrdersHistoryTableHeaderTotal,
  OrdersHistoryViewDetailBtnTitle
} from "src/shared/constants/orders/index";
import {IOrderListProps} from "src/shared/components/Pages/OrderHistoryPage/OrderList/types";
import {ICellInfo, ITableRow} from "src/shared/components/Common/AppTable/types";
import {AppDate} from "src/shared/components/Common/AppDate/index";
import {AppPrice} from "src/shared/components/Common/AppPrice/index";
import {SprykerButton} from "src/shared/components/UI/SprykerButton/index";
import {AppTable} from "src/shared/components/Common/AppTable/index";


export const OrderListBase: React.SFC<IOrderListProps> = (props): JSX.Element => {
  const {classes, orders, viewClickHandler} = props;

  const headerCellPart = 'header-';
  const rowPart = 'order-';

  const headerCells:  Array<ICellInfo> = [
    {id: `${headerCellPart}1`, content: OrdersHistoryTableHeaderID},
    {id: `${headerCellPart}2`, content: OrdersHistoryTableHeaderDate},
    {id: `${headerCellPart}3`, content: OrdersHistoryTableHeaderTotal},
    {id: `${headerCellPart}4`, content: ''},
  ];

  const bodyRows: Array<ITableRow> = orders.map((item: IOrderItem) => {
    return {
      id: `${rowPart}${item.id}`,
      cells: [
        {id: `id-${item.id}`, content: `${item.id}`},
        {id: `date-${item.id}`, content: <AppDate value={item.dateCreated}/>},
        { id: `price-${item.id}`,
          content: <AppPrice value={item.totals.grandTotal} specificCurrency={item.currency}/>
        },
        { id: `actions-${item.id}`,
          content: <SprykerButton
                      title={OrdersHistoryViewDetailBtnTitle}
                      value={item.id}
                      onClick={viewClickHandler}
                   />
        },
      ],
    };
  });

  return (
    <div className={classes.root}>
      <AppTable headerCells={headerCells} bodyRows={bodyRows} />
    </div>
  );
};

export const OrderList = withStyles(styles)(OrderListBase);
