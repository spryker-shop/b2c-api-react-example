import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { WishlistRowsProps as Props } from './types';
import { IProductAttributes } from '@interfaces/product';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

const WishlistItemBaseInfoComponent: React.SFC<Props> = ({classes, productItem, renderProduct}) => (
    <div className={classes.product}>
        <span className={classes.wrapProductImage}>
            <img src={productItem.image} height={42} width={42}/>
        </span>
        <div className={classes.productDescription}>
            <span className={classes.tableAction} onClick={renderProduct(productItem.sku, productItem.name)}>
                {productItem.name}
            </span>

            <span className={classes.attributes}>
                <FormattedMessage id={ 'product.sku.title' } />: {productItem.sku}
            </span>

            {
                productItem.attributes.map((attr: IProductAttributes, idx: number) => (
                    <span className={classes.attributes} key={`attr-${productItem.sku}-${idx}`}>
                        {`${Object.keys(attr)[0].split('_').join(' ')}: ${Object.values(attr)[0]}`}
                    </span>
                ))
            }
        </div>
    </div>
);

export const WishlistItemBaseInfo = withStyles(styles)(WishlistItemBaseInfoComponent);
