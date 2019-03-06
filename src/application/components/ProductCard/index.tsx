import * as React from 'react';
import { withStyles, Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@material-ui/core';
import { IProductPricesItem, priceTypeNameDefault, priceTypeNameOriginal } from '@interfaces/product';
import { AppPrice } from '../AppPrice';
import { ProductLabel } from '@application/components/ProductLabel';
import { getOneProductImage } from '@helpers/product/imageSetsParser';
import { ClickEvent } from '@interfaces/common';
import { IProductCardProps as Props } from './types';
import { styles } from './styles';

export const ProductCardBase: React.SFC<Props> = (props): JSX.Element => {
    const { classes, images, name = '', prices, sku, label } = props;

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

    const handleProductClick = (e: ClickEvent) => {
        e.preventDefault();
        props.onSelectProduct(sku);
    };

    return (
        <Card className={ classes.card } raised={ true }>
            <CardActionArea onClick={ handleProductClick } className={ classes.actionArea }>
                { image &&
                    <CardMedia
                        component="img"
                        className={ classes.media }
                        image={ image }
                        title={ name }
                    />
                }
                <ProductLabel label={ label } />
                <span className={ classes.actionAreaOverlay } />
            </CardActionArea>
            <CardContent className={ classes.cardContent }>
                <Typography gutterBottom component="h2" className={ classes.productName } data-type="productName">
                    { name }
                </Typography>
                <div className={ classes.productPrice }>
                    <Grid container alignItems="flex-end" spacing={ 8 }>
                        <Grid item>
                            <Typography
                                component="span"
                                variant="display2"
                                className={`${Boolean(oldPriceGross) ? classes.newPrice : ''}`}
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
            </CardContent>
        </Card>
    );
};

export const ProductCard = withStyles(styles)(ProductCardBase);
