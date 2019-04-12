import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CartItemProps as Props } from './types';
import { SquareImage } from '@application/components/SquareImage';
import { AppPrice } from '@application/components/AppPrice';
import { withStyles, Grid, Typography } from '@material-ui/core';
import { priceTypeNameOriginal } from '@interfaces/product';
import { pathProductPageBase } from '@constants/routes';
import { styles } from './styles';
import { NavLink } from 'react-router-dom';
import { SprykerQuantityCounter } from '@application/components/UI/SprykerQuantityCounter';

const CartItemComponent: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        sku,
        image,
        quantity,
        superAttributes,
        handleDeleteItem,
        handleChangeQty,
        name,
        priceDefaultGross,
        priceOriginalGross,
        isUpdateToDefault,
        abstractSku,
        calculations: { unitPriceToPayAggregation }
    } = props;

    return (

        <Grid container className={ classes.productItem }>
            <Grid item className={ classes.imageOuter }>
                <SquareImage image={ image } alt={ name } classes={{ imgWrapper: classes.imgWrapper }} />
            </Grid>
            <Grid item className={ classes.contentOuter }>
                <Grid container className={ classes.fullHeight }>
                    <Grid item xs={ 12 } sm={ 9 } className={ classes.info }>
                        <div className={ classes.growedBlock }>
                            <Typography component="h5" variant="headline" className={classes.name}>
                                <NavLink
                                    to={`${pathProductPageBase}/${abstractSku}`}
                                    className={classes.nameLink}
                                >
                                    { name }
                                </NavLink>
                            </Typography>
                            { superAttributes &&
                                superAttributes.map((attr: { [key: string]: string }, idx: number) => (
                                    <div key={`${sku}-attr-${idx}`} className={ classes.attributes }>
                                        {`${Object.keys(attr)[0].split('_').join(' ')}: `}
                                        <span className={ classes.attributesValue }>{ Object.values(attr)[0] }</span>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={`${classes.attributes} ${classes.attributesQty}`}>
                            <span className={classes.attributesTitle}>
                                <FormattedMessage id={ 'word.quantity.title' } />:
                            </span>
                            <SprykerQuantityCounter
                                name={ sku }
                                value={ quantity }
                                handleChangeQty={ handleChangeQty }
                                isUpdateToDefault={ isUpdateToDefault }
                            />
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
                        { (quantity > 1) &&
                            <div className={ classes.eachPrice }>
                                (
                                <AppPrice value={ unitPriceToPayAggregation } isStylesInherited />&nbsp;
                                <FormattedMessage id={ 'word.each.title' } />)
                            </div>
                        }
                    </Grid>
                </Grid>
            </Grid>
            <span onClick={ () => handleDeleteItem(sku) } className={ classes.removeBtn } />
        </Grid>
    );
};

export const CartItem = withStyles(styles)(CartItemComponent);
