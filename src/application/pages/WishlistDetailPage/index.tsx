import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { IWishlistPageProps as Props } from './types';
import { WishlistProductsList } from './WishlistProductsList';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { withRouter } from 'react-router';
import { pathWishlistsPage } from '@constants/routes';
import { PrevIcon } from '@pages/CheckoutPage/CheckoutPaymentStep/icons';
import { NavLink } from 'react-router-dom';

@(withRouter as Function)
@connect
class WishlistDetailComponent extends React.Component<Props> {
    public componentDidMount = (): void => {
        this.initRequestData();
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const shouldUpdateWishlist = this.props.location !== prevProps.location ||
            !this.props.isRejected && !this.props.isWishlistExist;

        if (shouldUpdateWishlist) {
            this.initRequestData();
        }
    };

    protected initRequestData = (): void => {
        const { isLoading, isAppDataSet, wishlistIdParam, getDetailWishlistAction } = this.props;
        const isDevServer = process.env.NODE_ENV === 'webpack-dev-server';
        const isParallelRequest = isDevServer ? isLoading : false;

        if (isParallelRequest) {
            return;
        }

        if (isAppDataSet && wishlistIdParam) {
            getDetailWishlistAction(wishlistIdParam);

            return;
        }
    };

    public render = (): JSX.Element => {
        const { classes, wishlist } = this.props;

        return (
            <>
                { wishlist &&
                    <>
                        <div className={ classes.heading }>
                            <Typography component="h1" variant="h2">
                                { wishlist.name }
                            </Typography>

                            <span className={ classes.amount }>
                                {`${ wishlist.numberOfItems } `}
                                <FormattedPlural
                                    value={ wishlist.numberOfItems }
                                    one={ <FormattedMessage id={ 'word.item.title' } /> }
                                    other={ <FormattedMessage id={ 'word.items.title' } /> }
                                />
                            </span>
                        </div>

                        <WishlistProductsList />

                        <div className={ classes.back }>
                            <NavLink to={ pathWishlistsPage } className={ classes.backLink }>
                                <span className={ classes.icon } >
                                    <PrevIcon />
                                </span>
                                <FormattedMessage id={ 'word.back.title' } />
                            </NavLink>
                        </div>
                    </>
                }
            </>
        );
    }
}

export const WishlistDetailPage = withStyles(styles)(WishlistDetailComponent);
