import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { withStyles, Grid, Button } from '@material-ui/core';
import {
    IProductConfiguratorAddToWishlistProps as Props,
    IProductConfiguratorAddToWishlistState as State
} from './types';
import { concreteProductType } from '@constants/product';
import { ClickEvent } from '@interfaces/common';
import { styles } from './styles';
import { SprykerSelect } from '@components/UI/SprykerSelect';
import { IWishlist } from '@interfaces/wishlist';
import { IMenuItemSelect } from '@components/UI/SprykerSelect/types';

@connect
class ProductConfiguratorAddToWishlistComponent extends React.Component<Props, State> {
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
        const { isWishlistLoading, isWishlistsFetched, getWishlistsAction } = this.props;

        if (!isWishlistLoading && !isWishlistsFetched) {
            getWishlistsAction();
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

    protected getFirstWishlist = (): string | null => {
        if (!this.props.isWishlistsFetched) {
            return null;
        }

        return (this.props.wishlists.length > 0) ? this.props.wishlists[0].id : null;
    };

    protected handleAddToWishlist = (event: ClickEvent): void => {
        this.props.addItemWishlistAction(this.state.wishlistSelected, this.props.sku);
    };

    protected isAddToWishlistBtnDisabled = (): boolean => {
        const { isWishlistsFetched, productType, isWishlistLoading } = this.props;

        return !isWishlistsFetched || productType !== concreteProductType || isWishlistLoading;
    };

    protected createWishlistMenuVariants = (): IMenuItemSelect[] | null =>
        this.props.wishlists.map((wishlist: IWishlist) => ({name: wishlist.name, value: wishlist.id}));

    public render(): JSX.Element {
        const { classes, wishlists } = this.props;
        const { wishlistSelected } = this.state;

        return (
            <Grid container spacing={ 8 }>
                { (wishlistSelected && wishlists.length > 1) &&
                    <Grid item xs={ 12 } lg={ 7 }>
                        <SprykerSelect
                            currentMode={ wishlistSelected }
                            onChangeHandler={ this.handleWishlistChange }
                            menuItems={ this.createWishlistMenuVariants() }
                            name="wishlists"
                            menuItemFirst={{
                                value: '',
                                name: <FormattedMessage id={ 'select.wish.list.label' } />,
                                disabled: true
                            }}
                            isFullWidth
                            isSimple
                            classes={ {
                                selectRoot: classes.selectRoot,
                                input: classes.input
                            } }
                        />
                    </Grid>
                }
                <Grid item xs={ 12 } lg>
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
