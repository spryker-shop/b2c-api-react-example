import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Divider } from '@material-ui/core';
import { AppPrice } from '@application/components/AppPrice';
import { ICartTotalProps as Props } from './types';
import { styles } from './styles';

export const CartTotalBase: React.SFC<Props> = (props): JSX.Element => {
    const { classes, totals, title, extraClass } = props;

    return (
        <div className={ `${classes.fullWidth} ${extraClass ? extraClass : null}` }>
            <Divider className={ classes.fullWidth } />

            <div className={
                `${classes.totalMsg} ${((totals && totals.discountTotal) || (totals && totals.taxTotal))
                    ? null
                    : classes.marginBottom}`
            }>
                <div className={ classes.currency }>
                    <FormattedMessage id={ 'word.subtotal.title' } />
                </div>
                <div>{ totals && <AppPrice value={ totals.subtotal } extraClassName={ classes.currency } /> }</div>
            </div>
            { totals
                ? (
                    <div
                        className={
                            `${classes.totalMsg} ${(totals && totals.discountTotal) ? null : classes.marginBottom}`
                        }>
                        <div className={ classes.currency }>
                            <FormattedMessage id={ 'word.tax.title' } />
                        </div>
                        <div>{ totals &&
                        <AppPrice value={ totals.taxTotal | 0 } extraClassName={ classes.currency } /> }</div>
                    </div>
                ) : null
            }
            { totals && totals.discountTotal
                ? (
                    <div className={ `${classes.totalMsg} ${classes.marginBottom}` }>
                        <div className={ classes.currency }>
                            <FormattedMessage id={ 'word.discount.title' } />
                        </div>
                        <div>
                            <span>- </span>
                            <AppPrice value={ totals.discountTotal } extraClassName={ classes.currency } />
                        </div>
                    </div>
                ) : null
            }

            <Divider className={ classes.fullWidth } />

            <div className={ `${classes.totalMsg}` }>
                <div className={ classes.grandTotal }>
                    { title }
                </div>
                <div>{ totals && <AppPrice value={ totals.grandTotal } extraClassName={ classes.grandTotal } /> }</div>
            </div>

            <Divider className={ classes.fullWidth } />
        </div>
    );
};

export const CartTotal = withStyles(styles)(CartTotalBase);
