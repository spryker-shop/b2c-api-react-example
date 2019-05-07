import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from './connect';
import { ICustomerPageProps as Props } from './types';
import { AppMain } from '@components/AppMain';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { CustomerSideBar } from './CustomerSideBar';
import { CustomerRouting } from './CustomerRouting';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
class CustomerPageComponent extends React.Component<Props> {
    public componentDidMount = (): void => {
        if (!this.props.isWishlistsInitial) {
            this.props.getWishlistsAction();
        }
    };

    public render() {
        const { classes, location, isWishlistsInitial } = this.props;

        return (
            <AppMain>
                {isWishlistsInitial &&
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
            </AppMain>
        );
    }
}

export const CustomerPage = withStyles(styles)(withRouter(CustomerPageComponent));
