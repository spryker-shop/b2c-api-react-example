import * as React from 'react';
import { connect } from './connect';
import { Redirect, withRouter } from 'react-router';
import { ICustomerPageProps as Props, ICustomerPageState as State } from './types';
import { MainContainer } from '@components/MainContainer';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { CustomerSideBar } from './CustomerSideBar';
import { CustomerRouting } from './CustomerRouting';
import { withStyles } from '@material-ui/core';
import { pathCustomerPage, pathCustomerOverview, pathWishlistsPage } from '@constants/routes';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { FormattedMessage } from 'react-intl';
import { breadcrumbsListFixtures } from './fixtures';
import { styles } from './styles';
import { IBreadcrumbItem } from '@interfaces/common';

@(withRouter as Function)
@connect
class CustomerPageComponent extends React.PureComponent<Props, State> {
    public readonly state: State = {
        breadcrumbsList: []
    };

    public componentDidMount = (): void => {
        if (!this.props.isWishlistsInitial) {
            this.props.getWishlistsAction();
        }

        this.getBreadcrumbsList(this.props.location.pathname);
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const isWishlistDetailInitialaized = !prevProps.isWishlistsDetailInitial && this.props.isWishlistsDetailInitial;
        if (prevProps.location.pathname !== this.props.location.pathname || isWishlistDetailInitialaized) {
            this.getBreadcrumbsList(this.props.location.pathname);
        }
    };

    protected getBreadcrumbsList = (pathname: string) => {
        const { wishlist, isWishlistsDetailInitial } = this.props;
        const additionalBreadcrumbsItems = breadcrumbsListFixtures.filter(item => pathname.includes(item.path))
            .map(item => item.listData)[0];

        const breadcrumbsListTemplate: IBreadcrumbItem[] = [{
            name: <FormattedMessage id={ 'account.title' } />,
            path: pathCustomerOverview,
            current: !Boolean(additionalBreadcrumbsItems)
        }];

        const breadcrumbsList = Boolean(additionalBreadcrumbsItems) ?
            breadcrumbsListTemplate.concat(additionalBreadcrumbsItems) : breadcrumbsListTemplate;

        if (pathname.includes(`${ pathWishlistsPage }/`) && isWishlistsDetailInitial) {
            const breadcrumbsWishlistItem: IBreadcrumbItem = {
                name: wishlist.name,
                path: `${ pathWishlistsPage }/${ wishlist.id }`,
                current: true
            };

            breadcrumbsList.push(breadcrumbsWishlistItem);
        }

        this.setState({ breadcrumbsList });
    };

    public componentWillUnmount = (): void => {
        this.props.clearOrdersCollectionAction();
        this.props.clearAddressAction();
    };

    public render(): JSX.Element {
        const { classes, location, isWishlistsInitial } = this.props;
        const { breadcrumbsList } = this.state;
        const isTemplatePage = location.pathname === pathCustomerPage;

        if (isTemplatePage) {
            return <Redirect to={ pathCustomerOverview } />;
        }

        return (
            <>
                <Breadcrumbs breadcrumbsList={ breadcrumbsList } />

                <MainContainer>
                    { isWishlistsInitial &&
                    <div className={ classes.container }>
                        <div className={ classes.colSidebar }>
                            <CustomerSideBar location={ location } />
                        </div>

                        <div className={ classes.colContent }>
                            <ErrorBoundary>
                                <CustomerRouting />
                            </ErrorBoundary>
                        </div>
                    </div>
                    }
                </MainContainer>
            </>
        );
    }
}

export const CustomerPage = withStyles(styles)(CustomerPageComponent);
