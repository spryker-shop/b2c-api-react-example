import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AppPrice } from '@application/components/AppPrice';
import { IMiniCartItemProps as Props } from './types';
import { styles, cartProductImageSize } from './styles';
import { SquareImage } from '@application/components/SquareImage';
import { priceTypeNameOriginal } from '@interfaces/product';
import { FormattedMessage } from 'react-intl';

export const MiniCartItemComponent: React.SFC<Props> = props => {
    const {classes, productData, deleteItem} = props;

    return (
        <Grid container className={classes.productItem}>
            <Grid item className={classes.imageOuter}>
                <SquareImage
                    size={cartProductImageSize}
                    image={productData.image}
                    alt={productData.name}
                />
            </Grid>
            <Grid item className={classes.contentOuter}>
                <Grid container className={classes.content}>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12} sm={9}>
                                <Typography component="h5" className={classes.name}>
                                    {productData.name}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                {productData.priceDefaultGross
                                    ? <Typography component="p" className={classes.price}>
                                        <AppPrice
                                            value={productData.priceDefaultGross}
                                            isStylesInherited
                                        />
                                    </Typography>
                                    : null
                                }

                                {productData.priceOriginalGross
                                    ? <Typography component="p" className={classes.price}>
                                        <AppPrice
                                            value={productData.priceOriginalGross}
                                            priceType={priceTypeNameOriginal}
                                            isStylesInherited
                                        />
                                    </Typography>
                                    : null
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} className={classes.actionArea}>
                        <Typography component="p" className={classes.quantity}>
                            <FormattedMessage id={'word.quantity.title'} />: {productData.quantity}
                        </Typography>
                        <Button onClick={() => deleteItem(productData.sku)} className={classes.removeBtn}>
                            <FormattedMessage id={'remove.button.title'} />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export const MiniCartItem = withStyles(styles)(MiniCartItemComponent);
