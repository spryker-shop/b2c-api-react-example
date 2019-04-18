import * as React from 'react';
import { connect } from './connect';
import { IProductRelationsProps as Props } from './types';
import { TProductSKU } from '@interfaces/product';
import { ProductsSlider } from '@application/components/ProductsSlider';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { pathProductPageBase } from '@constants/routes';

@connect
class ProductRelationsComponent extends React.Component<Props> {
    protected onSelectProductHandle = (sku: TProductSKU): void => {
        this.props.changeLocation(`${pathProductPageBase}/${sku}`);
    };

    public componentDidMount = (): void => {
        const { sku, getProductRelations, cartId, getProductRelationsCart } = this.props;

        if (sku) {
            getProductRelations(sku);
        }

        if (cartId) {
            getProductRelationsCart(cartId);
        }
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const { isLoading, getProductRelations, cartId, sku, getProductRelationsCart } = this.props;

        if (!isLoading && prevProps.sku !== this.props.sku) {
            getProductRelations(sku);
        }

        if (!isLoading && prevProps.cartId !== cartId) {
            getProductRelationsCart(cartId);
        }
    };

    public render = (): JSX.Element => {
        const { classes, products, currency, title, isLoading } = this.props;

        if (!products.length || isLoading) {
            return null;
        }

        return (
            <div className={ classes.root }>
                { Boolean(title) &&
                    <Typography className={ classes.title } color="textSecondary" component="h2" variant="h2">
                        { title }
                    </Typography>
                }

                <ProductsSlider
                    products={ products }
                    currency={ currency }
                    classes={{ wrapper: classes.slider }}
                    onSelectProduct={ this.onSelectProductHandle }
                />
            </div>
        );
    };
}

export const ProductRelations = withStyles(styles)(ProductRelationsComponent);
