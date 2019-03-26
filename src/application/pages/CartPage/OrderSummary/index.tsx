import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { OrderSummaryProps, OrderSummaryState } from './types';
import { NavLink } from 'react-router-dom';
import { pathCheckoutPage } from '@constants/routes';
import { CartTotal } from '@application/components/CartTotal';
import { Typography, Button, withStyles } from '@material-ui/core';
import { styles } from './styles';

export class OrderSummaryComponent extends React.Component<OrderSummaryProps, OrderSummaryState> {
    public readonly state: OrderSummaryState = {
        voucherCode: ''
    };

    public handleChangeVouchercode = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ voucherCode: e.target.value });
    };

    public render = (): JSX.Element => {
        const { classes, totals } = this.props;

        return (
            <>
                <Typography component="h3" variant="display2" className={ classes.title }>
                    <FormattedMessage id={ 'your.order.title' } />
                </Typography>

                <CartTotal totals={ totals } title={ <FormattedMessage id={ 'grand.total.title' } /> } />

                <Button
                    component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ pathCheckoutPage } /> }
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    <FormattedMessage id={ 'word.checkout.title' } />
                </Button>

                <span className={ classes.info }><FormattedMessage id={ 'shipping.fee.calculated.text' } /></span>
            </>
        );
    };
}

export const OrderSummary = withStyles(styles)(OrderSummaryComponent);
