import * as React from 'react';
import { connect } from './connect';
import { FormattedPlural, FormattedMessage } from 'react-intl';
import { CartPageProps } from './types';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { AppMain } from '@application/components/AppMain';
import { CartRows } from './CartRows';
import { OrderSummary } from './OrderSummary';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
export class CartPageBase extends React.Component<CartPageProps> {
    public render() {
        const {classes, isCartEmpty, isUserLoggedIn, totalQty} = this.props;

        if (isCartEmpty) {
            return (
                <AppMain>
                    <Grid item xs={12} className={ classes.emptyCart }>
                        <Typography
                            variant="display2"
                            noWrap
                            align="center"
                        >
                            <FormattedMessage id={'cart.is.empty.message'} />
                        </Typography>
                    </Grid>
                </AppMain>
            );
        }

        return (
            <AppMain>
                <Grid item xs={ 12 } container spacing={ 24 } className={ classes.root }>
                    <Grid item xs={ 12 } md={ 8 }>
                        <Typography
                            variant="display1"
                            noWrap
                            align="left"
                            color="primary"
                        >
                            <FormattedMessage
                                id={ `${isUserLoggedIn ? 'cart.with.items.title' : 'cart.quest.with.items.title'}` }
                                values={{ items: totalQty }}
                            />

                            <span>
                                { ` - ${totalQty} ` }
                            </span>

                            <FormattedPlural
                                value={ totalQty }
                                one={ <FormattedMessage id={ 'word.item.title' } /> }
                                other={ <FormattedMessage id={ 'word.items.title' } /> }
                            />
                        </Typography>

                        <ErrorBoundary>
                            <CartRows />
                        </ErrorBoundary>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <ErrorBoundary>
                            <OrderSummary />
                        </ErrorBoundary>
                    </Grid>
                </Grid>
            </AppMain>
        );
    }
}

export const CartPage = withStyles(styles)(CartPageBase);
export default CartPage;
