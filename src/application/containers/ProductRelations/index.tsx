import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { IProductRelationsProps as Props } from './types';
import { ProductsSlider } from '@application/components/ProductsSlider';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
class ProductRelationsBase extends React.Component<Props> {
    public componentDidMount = () => {
        const { sku, getProductRelations } = this.props;

        if (sku) {
            getProductRelations(sku);
        }
    };

    public render = (): JSX.Element => {
        const { classes, products, currency } = this.props;

        if (!products.length) {
            return null;
        }

        return (
            <div className={ classes.root }>
                <Typography className={ classes.title } color="textSecondary" component="h2" variant="display3">
                    <FormattedMessage id={ 'product.relations.title' } />
                </Typography>
                <ProductsSlider products={ products } currency={ currency } />
            </div>
        );
    };
}

export const ProductRelations = withStyles(styles)(ProductRelationsBase);
