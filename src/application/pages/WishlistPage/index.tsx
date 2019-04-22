import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';

import { IWishlistPageProps as Props } from './types';

import { AppPageTitle } from '@application/components/AppPageTitle';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { AddNewWishlistForm } from './AddNewWishlistForm';
import { WishlistsTable } from './WishlistsTable';

import { Grid, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
export class WishlistPageBase extends React.Component<Props> {
    public componentDidMount = (): void => {
        if (!this.props.isInitial) {
            this.props.getWishlistsAction();
        }
    }

    public render() {
        const { classes } = this.props;

        return (
            <Grid container>
                <Grid item xs={12}>
                    <AppPageTitle
                        classes={{root: classes.appPageTitleRoot}}
                        title={<FormattedMessage id={ 'word.wishlist.title' } />}
                    />
                </Grid>

                <Grid item xs={12}>
                    <ErrorBoundary>
                        <AddNewWishlistForm />
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <WishlistsTable />
                    </ErrorBoundary>
                </Grid>
            </Grid>
        );
    }
}

export const WishlistPage = withStyles(styles)(WishlistPageBase);

export default WishlistPage;
