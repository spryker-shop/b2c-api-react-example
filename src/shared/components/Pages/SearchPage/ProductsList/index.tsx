import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { IProductsListProps } from './types';
import { IProductCard, IProductLabel } from '@interfaces/product';
import { getProductLabel } from '@helpers/product/label';
import { ProductCard } from '@components/Common/ProductCard';
import { AppPageHeadline } from '@components/Common/AppPageHeadline';
import { Grid, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { sprykerTheme } from 'src/shared/theme/sprykerTheme';

export const ProductsListBase: React.SFC<IProductsListProps> = props => {
    const {
        classes,
        products,
        selectProductHandler,
        currency,
        isLoading,
        productsLabeled,
        availableLabels,
    } = props;

    const isProductsExist = (Array.isArray(products) && products.length);

    return (
        <Grid container spacing={sprykerTheme.appFixedDimensions.gridSpacing} className={classes.root}>
            {isProductsExist
                ? products.map((product: IProductCard) => {
                    let label: IProductLabel | null = null;
                    if (productsLabeled) {
                        const labelsIdArr = productsLabeled[product.abstractSku] || null;
                        label = getProductLabel(labelsIdArr, availableLabels);
                    }

                    return (
                        <Grid item xs={12} sm={6} md={4} key={product.abstractSku}>
                            <ProductCard
                                currency={currency}
                                images={product.images}
                                price={product.price}
                                prices={product.prices}
                                name={product.abstractName}
                                sku={product.abstractSku}
                                onSelectProduct={selectProductHandler}
                                label={label}
                            />
                        </Grid>
                    );
                })
                : <Grid item xs>
                    <AppPageHeadline
                        title={ <FormattedMessage id={ isLoading ? 'loading.page.title' : 'empty.page.title' } />}
                    />
                </Grid>
            }
        </Grid>
    );
};

export const ProductsList = withStyles(styles)(connect(ProductsListBase));
