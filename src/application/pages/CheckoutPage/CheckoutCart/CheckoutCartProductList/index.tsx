import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { pathProductPageBase } from '@constants/routes';
import { FormattedMessage } from 'react-intl';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { SquareImage } from '@application/components/SquareImage';
import { AppPrice } from '@application/components/AppPrice';
import { priceTypeNameOriginal } from '@interfaces/product';
import { ICartItem } from '@interfaces/cart';
import { ICheckoutCartProductListProps as Props } from './types';
import { styles } from './styles';

const CheckoutCartProductListComponent: React.SFC<Props> = (props): JSX.Element => {
    const { products, classes } = props;

    if (!products) {
        return null;
    }

    const renderProductItems = (): JSX.Element[] => (
        products.map((item: ICartItem) => {
            const {
                sku,
                image,
                name,
                quantity,
                priceDefaultGross,
                priceOriginalGross,
                abstractSku,
                superAttributes
            } = item;

            return (
                <Grid container key={ sku } className={ classes.productItem }>
                    <Grid item className={ classes.imageOuter }>
                        <SquareImage image={ image } alt={ name } />
                    </Grid>
                    <Grid item className={ classes.contentOuter }>
                        <Grid container>
                            <Grid item xs={ 12 } sm={ 9 } className={ classes.info }>
                                <Typography component="h5" variant="headline" className={classes.name}>
                                    <NavLink to={`${pathProductPageBase}/${abstractSku}`} className={classes.nameLink}>
                                        { name }
                                    </NavLink>
                                </Typography>
                                { superAttributes &&
                                    superAttributes.map((attr: { [key: string]: string }, idx: number) => (
                                        <div key={`${sku}-attr-${idx}`} className={ classes.attributes }>
                                            {`${Object.keys(attr)[0].split('_').join(' ')}: `}
                                            <span className={ classes.attributesValue }>
                                                { Object.values(attr)[0] }
                                            </span>
                                        </div>
                                    ))
                                }
                                <div className={ classes.attributes }>
                                    <FormattedMessage id={ 'word.quantity.title' } />:
                                    <span className={ classes.attributesValue }>
                                        {` ${quantity}`}
                                    </span>
                                </div>
                            </Grid>
                            <Grid item xs={ 12 } sm={ 3 } className={ classes.info }>
                                <div className={ classes.growedBlock }>
                                    <Typography
                                        component="p"
                                        className={`${classes.price} ${priceOriginalGross ? classes.newPrice : ''}`}
                                    >
                                        <AppPrice value={ priceDefaultGross } isStylesInherited />
                                    </Typography>
                                    { priceOriginalGross &&
                                        <Typography component="p" className={`${classes.price} ${classes.oldPrice}`}>
                                            <AppPrice
                                                value={ priceOriginalGross }
                                                priceType={ priceTypeNameOriginal }
                                                isStylesInherited
                                            />
                                        </Typography>
                                    }
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
        })
    );

    return (
        <div>
            { renderProductItems() }
        </div>
    );
};

export const CheckoutCartProductList = withStyles(styles)(CheckoutCartProductListComponent);
