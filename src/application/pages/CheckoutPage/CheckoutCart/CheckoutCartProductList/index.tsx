import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { SquareImage } from '@components/SquareImage';
import { Price } from '@components/Price';
import { ICartItem } from '@interfaces/cart';
import { ICheckoutCartProductListProps as Props } from './types';
import { styles } from './styles';
import { IIndexSignature } from '@interfaces/common';

const CheckoutCartProductListComponent: React.FC<Props> = (props): JSX.Element => {
    const { products, classes, productsAmountThreshold, isProductsExpanded } = props;

    if (!products) {
        return null;
    }

    const renderProductItems = (): JSX.Element[] => (
        products.map((item: ICartItem, index: number) => {
            const { sku, image, name, quantity, priceDefaultGross, priceOriginalGross, superAttributes } = item;
            const renderSuperAttributes = superAttributes ? (
                superAttributes.map((attr: IIndexSignature, index: number) => {
                    const attributeTitle = Object.keys(attr)[0].split('_').join(' ');
                    const attributeValue = Object.values(attr)[0];

                    return (
                        <div key={`${sku}-attr-${index}`} className={ classes.attributes }>
                            {`${attributeTitle}: `}
                            <span className={ classes.attributesValue }>{ attributeValue }</span>
                        </div>
                    );
                })
            ) : null;
            const shouldHideItems = !isProductsExpanded && index + 1 > productsAmountThreshold;
            const hiddenClass = shouldHideItems ? classes.productItemHidden : '';

            return (
                <Grid container key={ sku } className={`${classes.productItem} ${hiddenClass}`}>
                    <Grid item className={ classes.imageOuter }>
                        <SquareImage image={ image } alt={ name } classes={{ imgWrapper: classes.imageWrapper }} />
                    </Grid>
                    <Grid item className={ classes.contentOuter }>
                        <Grid container>
                            <Grid item xs={ 12 } lg={ 9 } className={`${classes.info} ${classes.infoContent}`}>
                                <Typography component="h5" variant="h5" className={classes.name}>
                                    { name }
                                </Typography>
                                { renderSuperAttributes }
                                <div className={ classes.attributes }>
                                    <FormattedMessage id={ 'word.quantity.title' } />:
                                    <span className={ classes.attributesValue }>
                                        {` ${quantity}`}
                                    </span>
                                </div>
                            </Grid>
                            <Grid item xs={ 12 } lg={ 3 } className={ classes.info }>
                                <div className={`${classes.growedBlock} ${classes.prices}`}>
                                    <Typography
                                        component="p"
                                        className={`${classes.price} ${priceOriginalGross ? classes.newPrice : ''}`}
                                    >
                                        <Price value={ priceDefaultGross } />
                                    </Typography>
                                    { priceOriginalGross &&
                                        <Typography component="p" className={`${classes.price} ${classes.oldPrice}`}>
                                            <Price value={ priceOriginalGross } isOriginal />
                                        </Typography>
                                    }
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
        })
    );

    return (
        <div>
            { renderProductItems() }
        </div>
    );
};

export const CheckoutCartProductList = withStyles(styles)(CheckoutCartProductListComponent);
