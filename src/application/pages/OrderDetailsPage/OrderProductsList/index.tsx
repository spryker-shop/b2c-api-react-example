import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography, Grid, Button } from '@material-ui/core';
import { AppPrice } from '@components/AppPrice';
import { IOrderProductListProps as Props } from './types';
import { IOrderDetailsItem } from '@interfaces/order';
import { SquareImage } from '@components/SquareImage';
import { styles } from './styles';
import { ICartAddItem } from '@interfaces/cart';
import { createCartItemAddToCart } from '@helpers/cart';

export const OrderProductListBase: React.SFC<Props> = (props): JSX.Element => {
    const {classes, items, isCartLoading} = props;

    const addItemToCart = (sku: string, quantity: number): void => {
        const { cartId, addItemToCart, createCartAndAddItem, payloadForCreateCart } = props;
        const item: ICartAddItem = createCartItemAddToCart(sku, quantity);

        if (cartId) {
            addItemToCart(item, cartId);

            return;
        }

        createCartAndAddItem(payloadForCreateCart, item);
    };

    const renderProductItems = (): JSX.Element[] => (
        items.map((item: IOrderDetailsItem) => {
            const { sku, name, quantity, sumPrice, metadata: { superAttributes, image} } = item;

            const renderSuperAttributes = superAttributes ? (
                Object.keys(superAttributes).map((attr: string, index: number) => {
                    const attributeTitle = attr.split('_').join(' ');
                    const attributeValue = superAttributes[attr];

                    return (
                        <div key={`${sku}-attr-${index}`} className={ classes.attributes }>
                            <span className={ classes.attributesTitle }>{`${attributeTitle}: `}</span>
                            <span className={ classes.attributesValue }>{ attributeValue }</span>
                        </div>
                    );
                })
            ) : null;

            return (
                <Grid container key={ sku } className={`${classes.productItem}`}>
                    <Grid item className={ classes.imageOuter }>
                        <SquareImage image={ image } alt={ name } classes={{ imgWrapper: classes.imgWrapper }} />
                    </Grid>
                    <Grid item className={ classes.contentOuter }>
                        <Grid container spacing={ 16 }>
                            <Grid item xs={ 12 } sm={ 8 }>
                                <Typography component="h5" variant="h5" className={classes.name}>
                                    { name }
                                </Typography>
                                <div className={ classes.attributes }>
                                    <span className={ classes.attributesTitle }>
                                        <FormattedMessage id={ 'product.sku.title' } />:
                                    </span>
                                    <span className={ classes.attributesValue }>
                                        {` ${sku}`}
                                    </span>
                                </div>
                                { renderSuperAttributes }
                                <div className={ classes.attributes }>
                                    <span className={ classes.attributesTitle }>
                                        <FormattedMessage id={ 'word.quantity.title' } />:
                                    </span>
                                    <span className={ classes.attributesValue }>
                                        {` ${quantity}`}
                                    </span>
                                </div>
                                <div className={ classes.attributes }>
                                    <span className={ classes.attributesTitle }>
                                        <FormattedMessage id={ 'word.price.title' } />:
                                    </span>
                                    <span className={ classes.attributesValue }>
                                        <AppPrice value={ sumPrice } />
                                    </span>
                                </div>
                                { quantity > 1 &&
                                    <div className={ classes.attributes }>
                                        <span className={ classes.attributesTitle }>
                                            <FormattedMessage id={ 'total.price.title' } />:
                                        </span>
                                        <span className={ classes.attributesValue }>
                                            <AppPrice value={ sumPrice * quantity } />
                                        </span>
                                    </div>
                                }
                            </Grid>
                            <Grid item xs={ 12 } sm={ 4 }>
                                <Button
                                    variant="outlined"
                                    disabled={ isCartLoading }
                                    onClick={ () => addItemToCart(sku, quantity) }
                                    fullWidth
                                >
                                    <FormattedMessage id={ 'buy.again.title' } />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
        })
    );

    return (<>{ renderProductItems() }</>);
};

export const OrderProductList = connect(withStyles(styles)(OrderProductListBase));
