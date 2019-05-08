import * as React from 'react';
import { connect } from './connect';
import { Redirect, withRouter } from 'react-router';
import { ICustomerPageProps as Props } from './types';
import { AppMain } from '@components/AppMain';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { CustomerSideBar } from './CustomerSideBar';
import { CustomerRouting } from './CustomerRouting';
import { withStyles } from '@material-ui/core';
import { pathCustomerPage, pathCustomerOverviewPage } from '@constants/routes';
import { styles } from './styles';

@connect
class CustomerPageComponent extends React.PureComponent<Props> {
    public componentWillUnmount = (): void => {
        this.props.clearOrdersCollectionAction();
        this.props.clearAddressAction();
    };

    public render(): JSX.Element {
        const { classes, location } = this.props;
        const isTemplatePage = location.pathname === pathCustomerPage;

        if (isTemplatePage) {
            return <Redirect to={ pathCustomerOverviewPage } />;
        }

        return (
            <AppMain>
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
            </AppMain>
        );
    }
}

export const CustomerPage = withStyles(styles)(withRouter(CustomerPageComponent));
