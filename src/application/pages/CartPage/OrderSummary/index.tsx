import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { OrderSummaryProps as Props } from './types';
import { NavLink } from 'react-router-dom';
import { pathCheckoutPage } from '@constants/routes';
import { TotalsBlock } from '@components/TotalsBlock';
import { Typography, Button, withStyles } from '@material-ui/core';
import { styles } from './styles';

const OrderSummaryComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, totals, clearCheckoutDataForm } = props;

    return (
        <>
            <Typography component="h3" variant="h3" className={ classes.title }>
                <FormattedMessage id={ 'your.order.title' } />
            </Typography>

            <TotalsBlock
                totals={ totals }
                classes={{
                    totalText: classes.totalText,
                    totalTextPrice: classes.totalTextPrice
                }}
            />

            <Button
                component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ pathCheckoutPage } /> }
                variant="contained"
                color="primary"
                fullWidth
                onClick={ clearCheckoutDataForm }
            >
                <FormattedMessage id={ 'word.checkout.title' } />
            </Button>

            <span className={ classes.info }><FormattedMessage id={ 'shipping.fee.calculated.text' } /></span>
        </>
    );
};

export const OrderSummary = withStyles(styles)(OrderSummaryComponent);
