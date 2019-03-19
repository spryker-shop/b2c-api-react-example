import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { ProductAttributes } from './ProductAttributes';
import { IProductDetailProps } from './types';
import { styles } from './styles';

export const ProductDetailBase: React.SFC<IProductDetailProps> = (props): JSX.Element => {
    const {
        classes,
        attributes,
        attributeNames,
        description,
        sku
    } = props;

    return (
        <div className={classes.contentHelper}>
            <Grid container className={classes.contentContainer}>
                <Grid item xs={12} sm={6} className={classes.productDetailsBlock}>
                    <ProductAttributes attributes={attributes} attributeNames={attributeNames} />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.descriptionBlock}>
                    <Typography component="h3" color="inherit" className={classes.descriptionTitle}>
                        <FormattedMessage id={'product.deskription.title'} />
                    </Typography>
                    <Typography color="inherit" variant="body2" component="p" gutterBottom={true}>
                        {description}
                    </Typography>
                    <Typography
                        variant="subheading"
                        color="inherit"
                        gutterBottom={true}
                        className={classes.descriptionSku}
                    >
                        <FormattedMessage id={'product.sku.title'} />: {sku}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export const ProductDetail = withStyles(styles)(ProductDetailBase);
