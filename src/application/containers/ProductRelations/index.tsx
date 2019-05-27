import * as React from 'react';
import { connect } from './connect';
import { IProductRelationsProps as Props } from './types';
import { ProductsSlider } from '@components/ProductsSlider';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { pathProductPageBase } from '@constants/routes';

@connect
class ProductRelationsComponent extends React.Component<Props> {
    protected onSelectProductHandle = (sku: string): void => {
        this.props.push(`${pathProductPageBase}/${sku}`);
    };

    public componentDidMount = (): void => {
        const {
            sku,
            getProductRelationsAction,
            cartId,
            getProductRelationsCartAction,
            isUserLoggedIn,
            anonymId
        } = this.props;

        if (sku) {
            getProductRelationsAction(sku);
        }

        if (cartId) {
            getProductRelationsCartAction(cartId, isUserLoggedIn, anonymId);
        }
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const {
            isLoading,
            anonymId,
            getProductRelationsAction,
            cartId,
            sku,
            getProductRelationsCartAction,
            isUserLoggedIn
        } = this.props;

        if (!isLoading && prevProps.sku !== this.props.sku) {
            getProductRelationsAction(sku);
        }

        if (!isLoading && prevProps.cartId !== cartId) {
            getProductRelationsCartAction(cartId, isUserLoggedIn, anonymId);
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
