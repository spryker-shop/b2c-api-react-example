import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { createWishlistMenuVariants } from '@helpers/wishlist/list';
import { connect } from './connect';
import { withStyles, Grid } from '@material-ui/core';
import { SprykerForm } from '@application/components/UI/SprykerForm';
import { SprykerButton } from '@application/components/UI/SprykerButton';
import {
    IProductConfiguratorAddToWishlistProps as Props,
    IProductConfiguratorAddToWishlistState as State,
    IProductWishlistParams
} from './types';
import { concreteProductType, defaultItemValueDropdown } from '@interfaces/product';
import { IFormSettings } from '@application/components/UI/SprykerForm/types';
import { ClickEvent } from '@interfaces/common';
import { TWishlistName } from '@interfaces/wishlist';
import { styles } from './styles';

@connect
export class ProductConfiguratorAddToWishlistBase extends React.Component<Props, State> {
    public state: State = {
        wishlistSelected: null
    };

    public componentDidMount = (): void => {
        this.initRequestWishlistsData();
    }

    public componentDidUpdate = (): void => {
        this.setInitialWishlist();
        this.initRequestWishlistsData();
    }

    protected handleWishlistChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const {value} = event.target;

        if (this.state.wishlistSelected !== value) {
            this.setState({wishlistSelected: value});
        }
    };

    protected initRequestWishlistsData = (): void => {
        const {isWishlistLoading, isWishlistsFetched, getWishlists} = this.props;

        if (!isWishlistLoading && !isWishlistsFetched) {
            getWishlists();
        }
    };

    protected setInitialWishlist = (): void => {
        if (!this.state.wishlistSelected) {
            const wishlistSelected = this.getFirstWishlist();

            this.setState((prevState: State) => {
                if (prevState.wishlistSelected !== wishlistSelected) {
                    return ({
                        ...prevState,
                        wishlistSelected
                    });
                }
            });
        }
    };

    protected getFirstWishlist = (): TWishlistName | null => {
        if (!this.props.isWishlistsFetched) {
            return null;
        }

        return (this.props.wishlists.length > 0) ? this.props.wishlists[0].id : null;
    };

    protected handleAddToWishlist = (event: ClickEvent): void => {
        this.props.addToWishlist(this.state.wishlistSelected, this.props.sku);
    };

    protected isAddToWishlistBtnDisabled = (): boolean => (
        !this.props.isWishlistsFetched || this.props.productType !== concreteProductType
    );

    protected getWishlistFormSettings = (params: IProductWishlistParams): IFormSettings => {
        const {
            inputValue,
            wishlists,
            onChangeHandler
        } = params;
        const formSettings: IFormSettings = {
            formName: 'quantityForm',
            onChangeHandler,
            onSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => {
                console.info('Empty Wishlist Submit');
            },
            fields: [
                [
                    {
                        type: 'select',
                        inputName: 'wishlists',
                        inputValue,
                        spaceNumber: 12,
                        isRequired: false,
                        label: null,
                        isError: false,
                        menuItems: createWishlistMenuVariants(wishlists),
                        menuItemFirst: {
                            value: defaultItemValueDropdown,
                            name: <FormattedMessage id={'select.wish.list.label'} />,
                            disabled: true
                        }
                    }
                ]
            ]
        };

        return formSettings;
    };

    public render(): JSX.Element {
        const {classes} = this.props;
        const {wishlistSelected} = this.state;

        const formWishlistSettings: IFormSettings = this.getWishlistFormSettings({
            inputValue: wishlistSelected,
            wishlists: this.props.wishlists,
            onChangeHandler: this.handleWishlistChange
        });

        return (
            <Grid container spacing={24} className={classes.wishlistBtnArea}>
                {wishlistSelected &&
                <Grid item xs={12} sm={12} md={6}>
                    <SprykerForm
                        form={formWishlistSettings}
                        formClassName={classes.formWishlist}
                    />
                </Grid>
                }
                <Grid item
                      xs={12}
                      md={wishlistSelected ? 6 : 12}
                      className={classes.buyBtnParent}
                >
                    <SprykerButton
                        title={
                            <FormattedMessage id={'add.to.cart.wishlist.title'} />
                        }
                        extraClasses={classes.wishlistBtn}
                        onClick={this.handleAddToWishlist}
                        disabled={this.isAddToWishlistBtnDisabled()}
                    />
                </Grid>
            </Grid>
        );
    }
}

export const ProductConfiguratorAddToWishlist = withStyles(styles)(ProductConfiguratorAddToWishlistBase);
