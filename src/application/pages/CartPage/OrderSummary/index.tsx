import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { OrderSummaryProps, OrderSummaryState } from './types';
import { NavLink } from 'react-router-dom';
import { pathCheckoutPage } from '@constants/routes';
import { CartTotal } from '@application/components/CartTotal';
import { Typography, Button, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
export class OrderSummaryComponent extends React.Component<OrderSummaryProps, OrderSummaryState> {
    readonly state: OrderSummaryState = {
        voucherCode: '',
    };

    public handleChangeVouchercode = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({voucherCode: e.target.value});
    };

    public render = (): JSX.Element => {
        const { classes, totals } = this.props;

        return (
            <>
                <Typography
                    variant="display1"
                    noWrap
                    align="left"
                    color="primary"
                >
                    <FormattedMessage id={'word.total.title'} />
                </Typography>

                <CartTotal
                    extraClass={classes.cartTotalIndent}
                    totals={totals}
                    title={<FormattedMessage id={ 'grand.total.title' } />}
                />

                <NavLink
                    to={pathCheckoutPage}
                    className={classes.navLink}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.btnWrapper}
                    >
                        <FormattedMessage id={'continue.checkout.title'} />
                    </Button>
                </NavLink>
            </>
        );
    }
}

export const OrderSummary = withStyles(styles)(OrderSummaryComponent);
