import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { typeNotificationError } from '@constants/notifications';
import { connect } from './connect';
import { createCartItemAddToCart } from '@helpers/cart';
import { withStyles, Button, Typography } from '@material-ui/core';
import { NotificationsMessage } from '@application/components/Notifications/NotificationsMessage';
import { SprykerQuantityCounter } from '@application/components/UI/SprykerQuantityCounter';
import { CartIcon } from './icons';
import { concreteProductType } from '@interfaces/product';
import { ClickEvent } from '@interfaces/common';
import { ICartAddItem } from '@interfaces/cart';
import { IProductConfiguratorAddToCartProps as Props, IProductConfiguratorAddToCartState as State, } from './types';
import { styles } from './styles';

const quantitySelectedInitial = 1;

@connect
export class ProductConfiguratorAddToCartComponent extends React.Component<Props, State> {
    public readonly state: State = {
        quantitySelected: quantitySelectedInitial,
        isBuyBtnDisabled: true,
        isProcessCartLoading: false,
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

    public componentDidMount = (): void => {
        this.checkBuyBtnStatus();
    };

    public componentDidUpdate = (prevProps: Props, prevState: State): void => {
        this.checkBuyBtnStatus();
    };

    protected isShowQuantity = (): boolean => (
        Boolean(this.props.productType === concreteProductType && this.state.availability)
    );

    protected checkBuyBtnStatus = (): void => {
        const { isProcessCartLoading, isBuyBtnDisabled } = this.state;

        if (isProcessCartLoading) {
            return;
        }

        if (isBuyBtnDisabled && this.isShowQuantity()) {
            this.setState({ isBuyBtnDisabled: false });
        } else if (!isBuyBtnDisabled && !this.isShowQuantity()) {
            this.setState({ isBuyBtnDisabled: true });
        }
    };

    protected handleBuyBtnClick = (event: ClickEvent): void => {
        this.runProcessCart();
    };

    protected runProcessCart = async (): Promise<void> => {
        try {
            await this.setState({
                isBuyBtnDisabled: true,
                isProcessCartLoading: true
            });
            await this.runAddToCart();

            await this.setState((prevState: State) => ({
                ...prevState,
                quantity: this.props.product.quantity,
                availability: this.props.product.availability,
                quantitySelected: quantitySelectedInitial,
                isBuyBtnDisabled: false,
                isProcessCartLoading: false,
                isUpdateValue: true
            }));
        } catch (error) {
            NotificationsMessage({
                id: 'error.durning.add.product.to.cart.message',
                type: typeNotificationError
            });
        }
    };

    protected runAddToCart = async (): Promise<void> => {
        console.log(this.state.quantitySelected);
        const item: ICartAddItem = createCartItemAddToCart(this.props.sku, this.state.quantitySelected);
        if (this.props.isUserLoggedIn && this.props.cartId) {
            await this.props.addItemToCart(item, this.props.cartId);
        } else {
            if (this.props.isUserLoggedIn) {
                await this.props.createCartAndAddItem(this.props.payloadForCreateCart, item);
            } else {
                await this.props.addItemGuestCart(item, this.props.anonymId);
            }
        }
    };

    protected handleChangeQty = (name: string, value: number): void =>
        this.setState({ quantitySelected: value, isUpdateValue: false });

    public render(): JSX.Element {
        const { classes } = this.props;
        const { sku, quantitySelected, isUpdateValue } = this.state;

        return (
            <div className={ classes.root }>
                <Typography
                    variant="subheading"
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
                    classes={{ root: classes.counter }}
                    value={ quantitySelected }
                    isUpdateToDefault={ isUpdateValue }
                />

                <Button
                    variant="contained"
                    disabled={ this.state.isBuyBtnDisabled }
                    onClick={ this.handleBuyBtnClick }
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
