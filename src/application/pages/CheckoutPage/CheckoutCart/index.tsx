import * as React from 'react';
import { connect } from './connect';
import { pathCartPage } from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { withStyles, Button, Typography, Hidden } from '@material-ui/core';
import { TotalsBlock } from '@components/TotalsBlock';
import { CheckoutCartProductList } from './CheckoutCartProductList';
import { ICheckoutCartProps as Props, ICheckoutCartState as State } from './types';
import { LockIcon, EditIcon, HideIcon, ShowIcon } from './icons';
import { styles } from './styles';

@connect
class CheckoutCartComponent extends React.Component<Props, State> {
    protected readonly productsAmountThreshold = 10;
    public readonly state: State = {
        isProductsExpanded: false,
        isProductsOpened: false
    };

    protected onExpandButtonClickHandler = (): void => this.setState({ isProductsExpanded: true });

    protected onOpenProductsClickHandler = (): void =>
        this.setState((prevState: State) => ({ isProductsOpened: !prevState.isProductsOpened }));

    public render = (): JSX.Element => {
        const { isProductsExpanded, isProductsOpened } = this.state;
        const { classes, isSendBtnDisabled, sendData, isSummaryPage, products, totals, cartItemsQuantity } = this.props;
        const shouldShowMoreButton = !isProductsExpanded && products.length > this.productsAmountThreshold;
        const secureElement = (
            <span className={ classes.secure }>
                <span className={ classes.secureIcon }><LockIcon /></span>
                <span className={ classes.secureText }><FormattedMessage id={ 'secure.checkout.title' } /></span>
            </span>
        );
        const subheadingText = isProductsOpened ? 'word.hide.title' : 'word.view.title';
        const subheadingIcon = isProductsOpened ? <HideIcon /> : <ShowIcon />;
        const subheadingClasses = isProductsOpened ? classes.subheadingOpened : '';
        const productsWrapperClasses = isProductsOpened ? classes.productsWrapperOpened : '';

        return (
            <>
                <div className={ classes.box }>
                    <div className={ classes.boxInner }>
                        <Typography component="h3" variant="h3" className={ classes.title }>
                            <FormattedMessage id={ 'order.summary.title' } />
                        </Typography>

                        <div className={ classes.totals }>
                            <TotalsBlock
                                totals={ totals }
                                classes={{
                                    row: classes.totalRow,
                                    wrapper: classes.totalsInner
                                }}
                            />
                            { isSummaryPage &&
                                <Button
                                    variant="contained"
                                    disabled={ isSendBtnDisabled }
                                    fullWidth
                                    onClick={ sendData }
                                    className={ classes.submitButton }>
                                    { <FormattedMessage id={ 'place.order.title' } /> }
                                </Button>
                            }
                        </div>
                    </div>

                    <Hidden mdUp implementation="css">
                        { secureElement }
                    </Hidden>

                    <div className={ classes.boxInner }>
                        <div className={`${classes.subheading} ${subheadingClasses}`}>
                            <span className={ classes.subheadingTitle }>
                                <FormattedMessage id={ 'my.order.title' } />
                            </span>
                            <span className={ classes.subheadingTrigger } onClick={ this.onOpenProductsClickHandler }>
                                <span className={ classes.subheadingIcon }>
                                    { subheadingIcon }
                                </span>
                                <FormattedMessage id={ subheadingText } />
                            </span>
                        </div>

                        <div className={`${classes.productsWrapper} ${productsWrapperClasses}`}>
                            <div className={ classes.productHeading }>
                                { !isSummaryPage &&
                                    <NavLink to={ pathCartPage } className={ classes.editLink }>
                                        <FormattedMessage id={ 'word.edit.title' } />
                                        <span className={ classes.editDecor }>
                                            <span className={ classes.editIcon }>
                                                <EditIcon />
                                            </span>
                                        </span>
                                    </NavLink>
                                }
                                <div className={ classes.amountHolder }>
                                    <div className={ classes.amount }>
                                        {`${cartItemsQuantity} `}
                                        <FormattedPlural
                                            value={ cartItemsQuantity }
                                            one={ <FormattedMessage id={ 'word.item.title' } /> }
                                            other={ <FormattedMessage id={ 'word.items.title' } /> }
                                        />
                                    </div>
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
                    </div>
                </div>
                <Hidden only={['xs', 'sm']} implementation="css">
                    { secureElement }
                </Hidden>
            </>
        );
    }
}

export const CheckoutCart = withStyles(styles)(CheckoutCartComponent);
