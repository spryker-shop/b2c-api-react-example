import * as React from 'react';
import { withRouter } from 'react-router';
import { CustomerPageProps } from './types';
import { AppMain } from '@components/AppMain';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { CustomerSideBar } from './CustomerSideBar';
import { CustomerRouting } from './CustomerRouting';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';

@(withRouter as Function)
class CustomerPageComponent extends React.PureComponent<CustomerPageProps> {
    public render() {
        const { classes, location } = this.props;

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

export const CustomerPage = withStyles(styles)(CustomerPageComponent);
