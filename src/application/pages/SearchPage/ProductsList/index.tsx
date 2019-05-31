import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { IProductsListProps as Props } from './types';
import { IProductCard } from '@interfaces/product';
import { ProductCard } from '@components/ProductCard';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';

const ProductsListComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes, products, selectProductHandler, currency, isLoading } = props;

    const isProductsExist = (Array.isArray(products) && products.length);

    return (
        <div className={ classes.root }>
            <Grid container spacing={ 24 }>
                { isProductsExist
                    ? products.map((product: IProductCard) => (
                        <Grid item xs={ 6 } sm={ 4 } key={ product.abstractSku }>
                            <ProductCard
                                currency={ currency }
                                image={ product.image }
                                price={ product.price }
                                prices={ product.prices }
                                name={ product.abstractName }
                                sku={ product.abstractSku }
                                onSelectProduct={ selectProductHandler }
                                label={ product.labels }
                            />
                        </Grid>
                    ))
                    : <Grid item>
                        <Typography component="h3" align="center" variant="h3">
                            <FormattedMessage id={ isLoading ? 'loading.page.title' : 'empty.page.title' } />
                        </Typography>
                    </Grid>
                }
            </Grid>
        </div>
    );
};

export const ProductsList = withStyles(styles)(connect(ProductsListComponent));
