import * as React from 'react';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { IProductPricesItem, priceTypeNameDefault, priceTypeNameOriginal } from '@interfaces/product';
import { AppPrice } from '../AppPrice';
import { ProductLabel } from '@components/ProductLabel';
import { getOneProductImage } from '@helpers/product/imageSetsParser';
import { IProductCardProps as Props } from './types';
import { styles } from './styles';
import { SquareImage } from '@components/SquareImage';

export const ProductCardComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, images, name = '', prices, sku, label, onSelectProduct } = props;

    let actualPriceGross = 0;
    let actualPriceNet = 0;
    let oldPriceGross = 0;
    let oldPriceNet = 0;

    if (prices && prices.length > 0) {
        prices.forEach((data: IProductPricesItem) => {
            if (data.priceTypeName === priceTypeNameDefault) {
                actualPriceGross = data.grossAmount;
                actualPriceNet = data.netAmount;
            }
            if (data.priceTypeName === priceTypeNameOriginal) {
                oldPriceGross = data.grossAmount;
                oldPriceNet = data.netAmount;
            }
        });
    }

    const image = getOneProductImage(images);

    return (
        <div className={ classes.card } onClick={ () => onSelectProduct(sku) }>
            <div className={ classes.imageWrapper }>
                { image &&  <SquareImage image={ image } alt={ name } classes={{ imgWrapper: classes.image }} /> }
                <ProductLabel label={ label } />
            </div>
            <div className={ classes.content }>
                <div className={ classes.nameWrapper }>
                    <Typography color="textSecondary" component="h5" variant="h5" className={classes.name}>
                        { name }
                    </Typography>
                </div>
                <div className={ classes.prices }>
                    <Grid container alignItems="flex-end" spacing={ 8 }>
                        <Grid item>
                            <Typography
                                component="span"
                                variant="h3"
                                className={`${classes.price} ${Boolean(oldPriceGross) ? classes.newPrice : ''}`}
                            >
                                <AppPrice value={ actualPriceGross } />
                            </Typography>
                        </Grid>
                        { Boolean(oldPriceGross) &&
                            <Grid item>
                                <Typography color="textSecondary" component="span" className={ classes.oldPrice }>
                                    <AppPrice value={ oldPriceGross } priceType={ priceTypeNameOriginal } />
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export const ProductCard = withStyles(styles)(ProductCardComponent);
