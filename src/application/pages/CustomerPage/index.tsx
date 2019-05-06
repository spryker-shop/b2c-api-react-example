import * as React from 'react';
import { withRouter } from 'react-router';
import { ICustomerPageProps as Props } from './types';
import { AppMain } from '@components/AppMain';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { CustomerSideBar } from './CustomerSideBar';
import { CustomerRouting } from './CustomerRouting';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';

const CustomerPageComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, location } = props;

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
};

export const CustomerPage = withStyles(styles)(withRouter(CustomerPageComponent));
