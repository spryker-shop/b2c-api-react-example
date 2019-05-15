import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { IWishlistPageProps as Props } from './types';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { AddNewWishlistForm } from './AddNewWishlistForm';
import { WishlistsList } from './WishlistsList';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
class WishlistPageComponent extends React.Component<Props> {
    public render() {
        const { classes } = this.props;

        return (
            <>
                <Typography component="h1" variant="h2" className={ classes.title }>
                    <FormattedMessage id={ 'word.wishlist.title' } />
                </Typography>

                <div className={ classes.block }>
                    <ErrorBoundary>
                        <AddNewWishlistForm />
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <WishlistsList />
                    </ErrorBoundary>
                </div>
            </>
        );
    }
}

export const WishlistPage = withStyles(styles)(WishlistPageComponent);
