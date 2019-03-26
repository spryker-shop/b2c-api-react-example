import * as React from 'react';
import { connect } from './connect';
import { FormattedPlural, FormattedMessage } from 'react-intl';
import { CartPageProps as Props } from './types';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { AppMain } from '@application/components/AppMain';
import { CartRows } from './CartRows';
import { OrderSummary } from './OrderSummary';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { AppPrice } from '@application/components/AppPrice';
import { styles } from './styles';
import { ProductRelations } from '@application/containers/ProductRelations';

export const CartPageComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, isCartEmpty, totalQty, totals, cartId } = props;

    if (isCartEmpty) {
        return (
            <AppMain>
                <Grid item xs={ 12 } className={ classes.root }>
                    <Typography
                        variant="display2"
                        noWrap
                        align="center"
                    >
                        <FormattedMessage id={ 'cart.is.empty.message' } />
                    </Typography>
                </Grid>
            </AppMain>
        );
    }

    return (
        <AppMain>
            <Grid item xs={ 12 } container spacing={ 24 } className={ classes.root }>
                <Grid item xs={ 12 } md={ 8 }>
                    <div className={ classes.layout }>
                        <div className={ classes.heading }>
                            <Typography component="h3" variant="display2" className={ classes.title }>
                                <FormattedMessage id={ 'word.my.cart.title' } />
                            </Typography>
                            <Typography component="span" variant="headline" className={ classes.amount }>
                                {`${totalQty} `}
                                <FormattedPlural
                                    value={ totalQty }
                                    one={ <FormattedMessage id={ 'word.item.title' } /> }
                                    other={ <FormattedMessage id={ 'word.items.title' } /> }
                                />
                            </Typography>
                        </div>
                        <ErrorBoundary>
                            <CartRows />
                        </ErrorBoundary>

                        <div className={ classes.subtotal }>
                            <Typography
                                component="span"
                                variant="headline"
                                color="textSecondary"
                                className={ classes.subtotalText }
                            >
                                <FormattedMessage id={ 'word.subtotal.title' } />:
                            </Typography>
                            <Typography component="span" variant="display2">
                                <AppPrice value={ totals.subtotal } isStylesInherited />
                            </Typography>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={ 12 } md={ 4 }>
                    <div className={ classes.layout }>
                        <ErrorBoundary>
                            <OrderSummary totals={ totals } />
                        </ErrorBoundary>
                    </div>
                </Grid>

                <Grid item xs={ 12 }>
                    <ErrorBoundary>
                        <ProductRelations
                            cartId={ cartId }
                            title={ <FormattedMessage id={ 'similar.products.title' } /> }
                            type="cart"
                            classes={{ root: classes.sliderWrapper }}
                        />
                    </ErrorBoundary>
                </Grid>
            </Grid>
        </AppMain>
    );
};

export const CartPage = connect(withStyles(styles)(CartPageComponent));
