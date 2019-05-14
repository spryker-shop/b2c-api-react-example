import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { InputChangeEvent } from '@interfaces/common';
import { IWishlistsListProps as Props, IWishlistsListState as State } from './types';
import { IWishlist } from '@interfaces/wishlist';
import { Typography } from '@material-ui/core';
import { WishlistsListItem } from './WishlistsListItem';

@connect
export class WishlistsList extends React.Component<Props, State> {
    readonly state: State = {
        listName: '',
        listId: '',
        isUpdating: false
    };

    protected handleChangeUpdatedName = (event: InputChangeEvent): void =>
        this.setState({ listName: event.target.value });

    protected handleDeleteWishlist = (wishlistId: string): void => this.props.deleteWishlistAction(wishlistId);

    protected handleUpdateWishlist = (id: string, name: string): void => {
        const { listName, isUpdating, listId } = this.state;
        const { updateWishlistAction } = this.props;

        if (!isUpdating || isUpdating && listId !== id) {
            this.setState({ listId: id, listName: name, isUpdating: true });

            return;
        }

        if (listName !== name) {
            updateWishlistAction(id, listName);
        }

        this.setState({ listId: '', listName: '', isUpdating: false });
    };

    protected renderWishlistsList = (): JSX.Element[] => {
        const { isLoading, wishlists } = this.props;
        const { listName, listId } = this.state;

        return wishlists.map((wishlist: IWishlist) => (
            <WishlistsListItem
                key={ wishlist.id }
                id={ wishlist.id }
                activeListId={ listId }
                name={ wishlist.name }
                numberOfItems={ wishlist.numberOfItems }
                date={ wishlist.createdAt }
                isLoading={ isLoading }
                activeListName={ listName }
                handleChangeUpdatedName={ this.handleChangeUpdatedName }
                handleUpdateWishlist={ this.handleUpdateWishlist }
                handleDeleteWishlist={ this.handleDeleteWishlist }
            />
        )).reverse();
    };

    public render = (): JSX.Element => {
        const { wishlists } = this.props;

        if (!Boolean(wishlists.length)) {
            return (
                <Typography component="h3" variant="h3">
                    <FormattedMessage id={'create.list.message'} />
                </Typography>
            );
        }

        return <>{ this.renderWishlistsList() }</>;
    };
}
