import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { IProductsListProps as Props } from './types';
import { IProductCard, IProductLabel } from '@interfaces/product';
import { getProductLabel } from '@helpers/product/label';
import { ProductCard } from '@application/components/ProductCard';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';

const ProductsListComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, products, selectProductHandler, currency, isLoading, productsLabeled, availableLabels } = props;

    const isProductsExist = (Array.isArray(products) && products.length);

    return (
        <div className={ classes.root }>
            <Grid container spacing={ 24 }>
                { isProductsExist
                    ? products.map((product: IProductCard) => {
                        let label: IProductLabel[] | null = null;
                        if (productsLabeled) {
                            const labelsIdArr = productsLabeled[product.abstractSku] || null;
                            label = getProductLabel(labelsIdArr, availableLabels);
                        }

                        return (
                            <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ product.abstractSku }>
                                <ProductCard
                                    currency={ currency }
                                    images={ product.images }
                                    price={ product.price }
                                    prices={ product.prices }
                                    name={ product.abstractName }
                                    sku={ product.abstractSku }
                                    onSelectProduct={ selectProductHandler }
                                    label={ label }
                                />
                            </Grid>
                        );
                    })
                    : <Grid item>
                        <Typography component="h3" align="center" variant="display2">
                            <FormattedMessage id={ isLoading ? 'loading.page.title' : 'empty.page.title' } />
                        </Typography>
                    </Grid>
                }
            </Grid>
        </div>
    );
};

export const ProductsList = withStyles(styles)(connect(ProductsListComponent));
