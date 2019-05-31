import * as React from 'react';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { Price } from '@components/Price';
import { ProductLabel } from '@components/ProductLabel';
import { IProductCardProps as Props } from './types';
import { styles } from './styles';
import { SquareImage } from '@components/SquareImage';

const ProductCardComponent: React.FC<Props> = (props): JSX.Element => {
    const {
        classes,
        image,
        name = '',
        prices: {
            priceOriginalGross = null,
            priceDefaultGross = null
        },
        sku,
        label,
        onSelectProduct
    } = props;

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
                                className={`${classes.price} ${Boolean(priceOriginalGross) ? classes.newPrice : ''}`}
                            >
                                <Price value={ priceDefaultGross } />
                            </Typography>
                        </Grid>
                        { Boolean(priceOriginalGross) &&
                            <Grid item>
                                <Typography color="textSecondary" component="span" className={ classes.oldPrice }>
                                    <Price value={ priceOriginalGross } isOriginal />
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
