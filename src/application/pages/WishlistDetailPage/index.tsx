import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { WishlistPageProps as Props, WishlistPageState as State } from './types';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { AppPageTitle } from '@components/AppPageTitle';
import { WishlistMenu } from './WishlistMenu';
import { WishlistItemsTable } from './WishlistItemsTable';
import { Grid, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { TCartId } from '@interfaces/cart';

@connect
class WishlistDetailComponent extends React.Component<Props, State> {
    readonly state: State = {
        multiProducts: []
    };

    public componentDidMount = (): void => {
        if (!this.props.isWishlistExist || (this.props.wishlistIdParam !== this.props.wishlist.id)) {
            this.initRequestData();
        }
    };

    public componentDidUpdate = (): void => {
        if (!this.props.isRejected && !this.props.isWishlistExist) {
            this.initRequestData();
        }
    };

    protected initRequestData = (): boolean => {
        if (this.props.isLoading) {
            return;
        }

        if (this.props.isAppDataSet && this.props.wishlistIdParam) {
            this.props.getDetailWishlistAction(this.props.wishlistIdParam);

            return true;
        }

        return false;
    };

    protected moveToCartHandler = (cartId: TCartId, availableProducts: string[]): void => {
        this.props.multiItemsCartAction(cartId, availableProducts);

        this.setState({
            multiProducts: availableProducts
        });
    };

    protected deleteMultiItemsHandler = (cartItemsLength: number, prevCartItemsLength: number): void => {
        if (this.state.multiProducts.length && cartItemsLength > prevCartItemsLength) {
            this.props.deleteMultiItemsAction(this.props.wishlist.id, this.state.multiProducts);
            this.setState({
                multiProducts: []
            });
        }
    };

    public render = (): JSX.Element => {
        const { classes } = this.props;

        return (
            <Grid container>
                <Grid item xs={12}>
                    <AppPageTitle
                        classes={{
                            root: classes.appPageTitleRoot,
                        }}

                        title={<FormattedMessage id={'word.wishlist.title'} />}
                    />
                </Grid>

                <Grid item xs={12}>
                    <WishlistMenu wishlist={this.props.wishlist} />

                    <ErrorBoundary>
                        <WishlistItemsTable
                            wishlist={this.props.wishlist}
                            moveToCartHandler={this.moveToCartHandler}
                            deleteMultiItemsHandler={this.deleteMultiItemsHandler}
                        />
                    </ErrorBoundary>
                </Grid>
            </Grid>
        );
    }
}

export const WishlistDetailPage = withStyles(styles)(WishlistDetailComponent);
