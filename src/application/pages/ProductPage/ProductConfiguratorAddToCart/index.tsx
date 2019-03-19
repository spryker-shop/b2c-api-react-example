import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { typeNotificationError } from '@constants/notifications';
import { connect } from './connect';
import { createCartItemAddToCart } from '@helpers/cart';
import { createQuantityVariants } from '@helpers/product';
import { withStyles, Grid } from '@material-ui/core';
import { SprykerForm } from '@application/components/UI/SprykerForm';
import { SprykerButton } from '@application/components/UI/SprykerButton';
import { NotificationsMessage } from '@application/components/Notifications/NotificationsMessage';
import { concreteProductType } from '@interfaces/product';
import { IFormSettings } from '@application/components/UI/SprykerForm/types';
import { ClickEvent } from '@interfaces/common';
import { ICartAddItem } from '@interfaces/cart';
import {
    IProductConfiguratorAddToCartProps as Props,
    IProductConfiguratorAddToCartState as State,
    IProductQuantityParams
} from './types';
import { styles } from './styles';

const quantitySelectedInitial = 1;

@connect
export class ProductConfiguratorAddToCartBase extends React.Component<Props, State> {
    public state: State = {
        quantitySelected: quantitySelectedInitial,
        isBuyBtnDisabled: true,
        isProcessCartLoading: false,
        quantity: null,
        availability: false,
        sku: null
    };

    public static getDerivedStateFromProps = (nextProps: Props, prevState: State): State => {
        const isSwitchedOnNewProduct = nextProps.productType === concreteProductType && nextProps.sku !== prevState.sku;

        if (isSwitchedOnNewProduct) {
            return {
                sku: nextProps.sku,
                quantitySelected: quantitySelectedInitial,
                quantity: nextProps.product.quantity,
                availability: nextProps.product.availability
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

    protected handleProductQuantityChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
    ): void => {
        const valueParsed: number = Number.parseInt(event.target.value, 10);
        const { quantitySelected } = this.state;

        if (quantitySelected !== valueParsed) {
            this.setState({ quantitySelected: valueParsed });
        }
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
                isProcessCartLoading: false
            }));
        } catch (error) {
            NotificationsMessage({
                id: 'error.durning.add.product.to.cart.message',
                type: typeNotificationError
            });
        }
    };

    protected runAddToCart = async (): Promise<void> => {
        const item: ICartAddItem = createCartItemAddToCart(this.props.sku, this.state.quantitySelected);
        if (this.props.isUserLoggedIn && this.props.cartId) {
            await this.props.addItemToCart(item, this.props.cartId);
        } else {
            if (this.props.isUserLoggedIn) {
                await this.props.createCartAndAddItem(this.props.payloadForCreateCart, item);
            } else {
                console.log(this.props.anonymId);
                await this.props.addItemGuestCart(item, this.props.anonymId);
            }
        }
    };

    protected getQuantityFormSettings = (params: IProductQuantityParams): IFormSettings => {
        const {
            inputValue,
            quantity,
            onChangeHandler,
            controlsGroupClassName
        } = params;
        const formSettings: IFormSettings = {
            formName: 'quantityForm',
            controlsGroupClassName,
            onChangeHandler,
            onSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => {
                console.info('Empty quantity Submit');
            },
            fields: [
                [
                    {
                        type: 'select',
                        inputName: 'quantity',
                        inputValue,
                        spaceNumber: 4,
                        isRequired: false,
                        label: <FormattedMessage id={ 'word.quantity.title' } />,
                        isError: false,
                        menuItems: createQuantityVariants(quantity)
                    }
                ]
            ]
        };

        return formSettings;
    };

    public render(): JSX.Element {
        const { classes } = this.props;

        const formQuantitySettings: IFormSettings = this.getQuantityFormSettings({
            inputValue: this.state.quantitySelected,
            quantity: this.state.quantity,
            onChangeHandler: this.handleProductQuantityChange,
            controlsGroupClassName: classes.controlsGroupQuantity
        });

        return (
            <>
                <Grid container>
                    { this.isShowQuantity() &&
                    <Grid item xs={ 12 } md={ 12 } className={ classes.blockControl }>
                        <SprykerForm
                            form={ formQuantitySettings }
                            formClassName={ classes.formQuantity }
                        />
                    </Grid>
                    }
                </Grid>

                <Grid container>
                    <Grid item xs={ 12 } md={ 12 } className={ classes.buyBtnParent }>
                        <SprykerButton
                            title={ <FormattedMessage id={ 'add.to.cart.button.title' } /> }
                            extraClasses={ classes.buyBtn }
                            onClick={ this.handleBuyBtnClick }
                            disabled={ this.state.isBuyBtnDisabled }
                        />
                    </Grid>
                </Grid>
            </>
        );
    }
}

export const ProductConfiguratorAddToCart = withStyles(styles)(ProductConfiguratorAddToCartBase);
