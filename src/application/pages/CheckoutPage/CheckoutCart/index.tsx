import * as React from 'react';
import { connect } from './connect';
import { pathCartPage } from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { withStyles, Button, Typography } from '@material-ui/core';
import { CartTotal } from '@application/components/CartTotal';
import { CheckoutCartProductList } from './CheckoutCartProductList';
import { ICartDataProps as Props } from './types';
import { LockIcon, EditIcon } from './icons';
import { styles } from './styles';

const CheckoutCartComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, isSendBtnDisabled, sendData, isSummaryPage, products, totals, cartItemsQuantity } = props;

    return (
        <>
            <div className={ classes.box }>
                <Typography component="h3" variant="display2" className={ classes.title }>
                    <FormattedMessage id={ 'order.summary.title' } />
                </Typography>

                <div className={ classes.totals }>
                    <CartTotal totals={ totals } classes={{ wrapper: classes.totalsInner }}/>
                    { isSummaryPage &&
                        <Button variant="contained" disabled={ isSendBtnDisabled } fullWidth onClick={ sendData }>
                            { <FormattedMessage id={ 'place.order.title' } /> }
                        </Button>
                    }
                </div>

                <div className={ classes.productHeading }>
                    <NavLink to={ pathCartPage } className={ classes.editLink }>
                        <FormattedMessage id={ 'word.edit.title' } />
                        <span className={ classes.editDecor }>
                            <span className={ classes.editIcon }>
                                <EditIcon />
                            </span>
                        </span>
                    </NavLink>
                    <div className={ classes.amount }>
                        {`${cartItemsQuantity} `}
                        <FormattedPlural
                            value={ cartItemsQuantity }
                            one={ <FormattedMessage id={ 'word.item.title' } /> }
                            other={ <FormattedMessage id={ 'word.items.title' } /> }
                        />
                    </div>
                </div>
                <CheckoutCartProductList products={ products } />
            </div>
            <span className={ classes.secure }>
                <span className={ classes.secureIcon }>
                    <LockIcon />
                </span>
                <span className={ classes.secureText }>
                    <FormattedMessage id={ 'secure.checkout.title' } />
                </span>
            </span>
        </>
    );
}

export const CheckoutCart = connect(withStyles(styles)(CheckoutCartComponent));
