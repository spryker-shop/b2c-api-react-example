import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { createWishlistMenuVariants } from '@helpers/wishlist/list';
import { connect } from './connect';
import { withStyles, Grid, Button } from '@material-ui/core';
import {
    IProductConfiguratorAddToWishlistProps as Props,
    IProductConfiguratorAddToWishlistState as State
} from './types';
import { concreteProductType, defaultItemValueDropdown } from '@interfaces/product';
import { ClickEvent } from '@interfaces/common';
import { TWishlistName } from '@interfaces/wishlist';
import { styles } from './styles';
import { SprykerSelect } from '@application/components/UI/SprykerSelect';

@connect
export class ProductConfiguratorAddToWishlistComponent extends React.Component<Props, State> {
    public readonly state: State = {
        wishlistSelected: null
    };

    public componentDidMount = (): void => {
        this.setInitialWishlist();
        this.initRequestWishlistsData();
    };

    public componentDidUpdate = (): void => {
        this.setInitialWishlist();
        this.initRequestWishlistsData();
    };

    protected handleWishlistChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value } = event.target;

        if (this.state.wishlistSelected !== value) {
            this.setState({ wishlistSelected: value });
        }
    };

    protected initRequestWishlistsData = (): void => {
        const { isWishlistLoading, isWishlistsFetched, getWishlists } = this.props;

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

    protected isAddToWishlistBtnDisabled = (): boolean => {
        const { isWishlistsFetched, productType, isWishlistLoading } = this.props;

        return !isWishlistsFetched || productType !== concreteProductType || isWishlistLoading;
    };

    public render(): JSX.Element {
        const { classes, wishlists } = this.props;
        const { wishlistSelected } = this.state;

        return (
            <Grid container spacing={ 8 }>
                { wishlistSelected &&
                <Grid item xs={ 12 } lg={ 7 }>
                    <SprykerSelect
                        currentMode={ wishlistSelected }
                        changeHandler={ this.handleWishlistChange }
                        menuItems={ createWishlistMenuVariants(wishlists) }
                        name="wishlists"
                        menuItemFirst={ {
                            value: defaultItemValueDropdown,
                            name: <FormattedMessage id={ 'select.wish.list.label' } />,
                            disabled: true
                        } }
                        isFullWidth
                        isSimple
                        classes={ {
                            selectRoot: classes.selectRoot,
                            input: classes.input
                        } }
                    />
                </Grid>
                }
                <Grid item xs={ 12 } lg={ wishlistSelected ? 5 : 12 }>
                    <Button
                        variant="outlined"
                        disabled={ this.isAddToWishlistBtnDisabled() }
                        onClick={ this.handleAddToWishlist }
                        fullWidth
                    >
                        <FormattedMessage id={ 'add.to.cart.wishlist.title' } />
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export const ProductConfiguratorAddToWishlist = withStyles(styles)(ProductConfiguratorAddToWishlistComponent);
