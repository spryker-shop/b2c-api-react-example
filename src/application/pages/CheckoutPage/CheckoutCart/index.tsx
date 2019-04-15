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

@connect
class CheckoutCartComponent extends React.Component<Props> {
    protected readonly productsAmountThreshold = 10;
    public readonly state: any = {
        isProductsExpanded: false
    };

    protected onExpandButtonClickHandler = (): void => this.setState({ isProductsExpanded: true });

    public render = (): JSX.Element => {
        const { isProductsExpanded } = this.state;
        const { classes, isSendBtnDisabled, sendData, isSummaryPage, products, totals, cartItemsQuantity } = this.props;
        const shouldShowMoreButton = !isProductsExpanded && products.length > this.productsAmountThreshold;

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
                    <CheckoutCartProductList
                        products={ products }
                        productsAmountThreshold={ this.productsAmountThreshold }
                        isProductsExpanded={ isProductsExpanded }
                    />
                    { shouldShowMoreButton &&
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={ this.onExpandButtonClickHandler }
                        >
                            { <FormattedMessage id={ 'see.more.title' } /> }
                        </Button>
                    }
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
}

export const CheckoutCart = withStyles(styles)(CheckoutCartComponent);
