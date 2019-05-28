import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { createCartItemAddToCart } from '@helpers/cart';
import { withStyles, Button, Typography } from '@material-ui/core';
import { SprykerQuantityCounter } from '@components/UI/SprykerQuantityCounter';
import { CartIcon } from './icons';
import { concreteProductType, quantitySelectedInitial } from '@constants/product';
import { ICartAddItem } from '@interfaces/cart';
import { IProductConfiguratorAddToCartProps as Props, IProductConfiguratorAddToCartState as State, } from './types';
import { styles } from './styles';

@connect
export class ProductConfiguratorAddToCartComponent extends React.Component<Props, State> {
    public readonly state: State = {
        quantitySelected: quantitySelectedInitial,
        quantity: 1,
        availability: false,
        sku: null,
        isUpdateValue: false
    };

    public static getDerivedStateFromProps = (nextProps: Props, prevState: State): State => {
        const isSwitchedOnNewProduct = nextProps.productType === concreteProductType && nextProps.sku !== prevState.sku;

        if (isSwitchedOnNewProduct) {
            return {
                sku: nextProps.sku,
                quantitySelected: quantitySelectedInitial,
                quantity: nextProps.product.quantity,
                availability: nextProps.product.availability,
                isUpdateValue: true
            };
        }

        return null;
    };

    protected handleBuyBtnClick = (): void => {
        this.runAddToCart();

        this.setState((prevState: State) => ({
            ...prevState,
            quantity: this.props.product.quantity,
            availability: this.props.product.availability,
            quantitySelected: quantitySelectedInitial,
            isUpdateValue: true
        }));
    };

    protected runAddToCart = (): void => {
        const item: ICartAddItem = createCartItemAddToCart(this.props.sku, this.state.quantitySelected);
        const { isUserLoggedIn, addItemToCart, cartId, anonymId } = this.props;

        addItemToCart(item, cartId, anonymId, isUserLoggedIn);
    };

    protected handleChangeQty = (name: string, value: number): void =>
        this.setState({ quantitySelected: value, isUpdateValue: false });

    public render(): JSX.Element {
        const { classes, isCartLoading, productType } = this.props;
        const { sku, quantitySelected, isUpdateValue, availability } = this.state;
        const isButtonDisable = productType !== concreteProductType || isCartLoading || !availability;

        return (
            <div className={ classes.root }>
                <div className={ classes.counter }>
                    <Typography
                        variant="h6"
                        component="span"
                        color="textSecondary"
                        className={ classes.title }
                    >
                        <FormattedMessage id={ 'word.quantity.title' } />
                    </Typography>
                    <SprykerQuantityCounter
                        name={ sku }
                        isBigger
                        handleChangeQty={ this.handleChangeQty }
                        delayDuration={ 0 }
                        isUseSubmitInspection={ false }
                        value={ quantitySelected }
                        isUpdateToDefault={ isUpdateValue }
                    />
                </div>

                <Button
                    variant="contained"
                    disabled={ isButtonDisable }
                    onClick={ this.handleBuyBtnClick }
                    className={ classes.button }
                    fullWidth
                >
                    <FormattedMessage id={ 'add.to.cart.button.title' } />
                    <span className={ classes.icon }><CartIcon /></span>
                </Button>
            </div>
        );
    }
}

export const ProductConfiguratorAddToCart = withStyles(styles)(ProductConfiguratorAddToCartComponent);
