import * as React from 'react';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { AppPrice } from '@components/AppPrice';
import { IMiniCartItemProps as Props } from './types';
import { styles } from './styles';
import { SquareImage } from '@components/SquareImage';
import { FormattedMessage } from 'react-intl';

const MiniCartItemComponent: React.SFC<Props> = props => {
    const {
        classes,
        productData: {
            image,
            name,
            prices: {
                priceDefaultGross,
                priceOriginalGross
            },
            quantity,
            sku
        },
        deleteItem
    } = props;

    return (
        <Grid container className={ classes.productItem }>
            <Grid item className={ classes.imageOuter }>
                <SquareImage image={ image } alt={ name } />
            </Grid>
            <Grid item className={ classes.contentOuter }>
                <Grid container className={ classes.content }>
                    <Grid item xs={ 12 }>
                        <Grid container>
                            <Grid item xs={ 12 } sm={ 9 }>
                                <Typography component="h5" variant="h5" className={ classes.name }>
                                    { name }
                                </Typography>
                            </Grid>

                            <Grid item xs={ 12 } sm={ 3 }>
                                <Typography
                                    component="p"
                                    className={`${classes.price} ${priceOriginalGross ? classes.newPrice : ''}`}
                                >
                                    <AppPrice value={ priceDefaultGross } />
                                </Typography>

                                { priceOriginalGross &&
                                    <Typography component="p" className={`${classes.price} ${classes.oldPrice}`}>
                                        <AppPrice value={ priceOriginalGross } isOriginal />
                                    </Typography>
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={ 12 } className={ classes.actionArea }>
                        <Typography component="p" className={ classes.quantity }>
                            <FormattedMessage id={ 'word.quantity.title' } />:
                            <span className={ classes.quantityValue }> { quantity }</span>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <span onClick={ () => deleteItem(sku) } className={ classes.removeBtn } />
        </Grid>
    );
};

export const MiniCartItem = withStyles(styles)(MiniCartItemComponent);
