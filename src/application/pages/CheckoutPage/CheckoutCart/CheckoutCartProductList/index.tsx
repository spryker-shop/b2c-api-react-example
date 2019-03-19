import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ListItem, withStyles } from '@material-ui/core';
import { SquareImage } from '@application/components/SquareImage';
import { AppPrice } from '@application/components/AppPrice';
import { priceTypeNameOriginal } from '@interfaces/product';
import { ICartItem } from '@interfaces/cart';
import { ICheckoutCartProductListProps as Props } from './types';
import { styles } from './styles';

export const CheckoutCartProductListBase: React.SFC<Props> = (props): JSX.Element => {
    const { products, classes, listItemHeight } = props;

    return (
        <>
            { products.map((item: ICartItem) => {
                const {
                    sku,
                    image,
                    name,
                    quantity,
                    calculations: {
                        sumPriceToPayAggregation,
                        sumGrossPrice
                    }
                } = item;

                return (
                    <ListItem
                        key={ sku }
                        disableGutters
                        divider
                        className={ classes.listItem }
                    >
                        <SquareImage
                            image={ image }
                            size={ listItemHeight }
                            alt={ name }
                        />
                        <div className={ classes.itemWrapper }>
                            <div className={ classes.itemName }>{ name }</div>
                            <AppPrice value={ sumPriceToPayAggregation }
                                      extraClassName={ classes.priceAndQtyInfo }
                            />
                            { (sumPriceToPayAggregation !== sumGrossPrice) &&
                                <AppPrice
                                    value={ sumGrossPrice }
                                    extraClassName={ `${classes.priceAndQtyInfo} ${classes.smallFont}` }
                                    priceType={ priceTypeNameOriginal }
                                />
                            }
                            <div className={ `${classes.priceAndQtyInfo} ${classes.marginTopQty}` }>
                                <FormattedMessage id={ 'word.quantity.title' } />{ `: ${quantity}` }
                            </div>
                        </div>
                    </ListItem>
                );
            }) }
        </>
    );
};

export const CheckoutCartProductList = withStyles(styles)(CheckoutCartProductListBase);
