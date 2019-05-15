import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import { AppPrice } from '@components/AppPrice';
import { ITotalsBlockProps as Props } from './types';
import { IOrderDetailsExpenseItem } from '@interfaces/order';
import { styles } from './styles';

const TotalsBlockComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, totals, expenses, isMinus } = props;

    if (!totals) {
        return null;
    }

    return (
        <div className={ classes.wrapper }>
            <div className={ classes.row }>
                <Typography component="span" variant="h5" color="textSecondary">
                    <FormattedMessage id={ 'word.subtotal.title' } />
                </Typography>
                <Typography component="span" variant="h5" color="textSecondary" className={ classes.price }>
                    <AppPrice value={ totals.subtotal } />
                </Typography>
            </div>

            <div className={classes.row}>
                <Typography component="span" variant="h5" color="textSecondary">
                    <FormattedMessage id={ 'word.tax.title' } />
                </Typography>
                <Typography component="span" variant="h5" color="textSecondary" className={ classes.price }>
                    <AppPrice value={ totals.taxTotal || 0 } />
                </Typography>
            </div>

            {(Boolean(expenses)) &&
                expenses.map((item: IOrderDetailsExpenseItem, index: number) => (
                    <div className={classes.row} key={`${item.name}${index}`}>
                        <Typography component="span" variant="h5" color="textSecondary">
                            <FormattedMessage id={ 'order.detail.shipment.title' } />
                        </Typography>
                        <Typography component="span" variant="h5" color="textSecondary" className={ classes.price }>
                            <AppPrice value={ item.sumPrice || 0 } />
                        </Typography>
                    </div>
                ))
            }

            {(Boolean(expenses) && expenses.length > 1) &&
                <div className={classes.row}>
                    <Typography component="span" variant="h5" color="textSecondary">
                        <FormattedMessage id={ 'order.detail.shipment.total.title' } />
                    </Typography>
                    <Typography component="span" variant="h5" color="textSecondary" className={ classes.price }>
                        <AppPrice value={ totals.expenseTotal } />
                    </Typography>
                </div>
            }

            { Boolean(totals.discountTotal) &&
                <div className={ classes.row }>
                    <Typography component="span" variant="h5" color="textSecondary">
                        <FormattedMessage id={ 'word.discount.title' } />
                    </Typography>
                    <Typography component="span" variant="h5" className={`${classes.discountText} ${classes.price}`}>
                        <AppPrice value={ totals.discountTotal } isMinus={ isMinus } />
                    </Typography>
                </div>
            }

            <div className={ classes.row }>
                <Typography component="span" className={ classes.totalText }>
                    <FormattedMessage id={ 'grand.total.title' } />
                </Typography>
                <Typography component="span" className={`${classes.totalText} ${classes.totalTextPrice}`}>
                    <AppPrice value={ totals.grandTotal } />
                </Typography>
            </div>
        </div>
    );
};

TotalsBlockComponent.defaultProps = {
    isMinus: true
};

export const TotalsBlock = withStyles(styles)(TotalsBlockComponent);
