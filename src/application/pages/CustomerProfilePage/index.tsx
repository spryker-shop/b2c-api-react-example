import * as React from 'react';
import { connect } from './connect';
import { ICustomerProfilePageProps as Props } from './types';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { UpdateProfile } from './UpdateProfile';
import { ChangePassword } from './ChangePassword';
import { AccountActions } from './AccountActions';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { Preloader } from '@components/Preloader';

@connect
class CustomerProfilePageComponent extends React.Component<Props> {
    public componentDidMount = () => {
        if (!this.props.isCustomerDataExist) {
            this.initRequestData();
        }
    };

    public componentDidUpdate = () => {
        if (!this.props.isRejected && !this.props.isCustomerDataExist) {
            this.initRequestData();
        }
    };

    private initRequestData = () => {
        if (!this.props.isLoading && this.props.isAppDataSet && this.props.customerReference) {
            this.props.getCustomerData(this.props.customerReference);
        }
    };

    public render = (): JSX.Element => {
        if (!this.props.isCustomerDataExist) {
            return <Preloader isStatic />;
        }

        return (
            <>
                <ErrorBoundary>
                    <UpdateProfile customerReference={ this.props.customerReference } />
                </ErrorBoundary>
                <ErrorBoundary>
                    <ChangePassword customerReference={ this.props.customerReference } />
                </ErrorBoundary>
                <ErrorBoundary>
                    <AccountActions
                        customerReference={ this.props.customerReference }
                        routerPush={ this.props.routerPush }
                    />
                </ErrorBoundary>
            </>
        );
    }
}

export const CustomerProfilePage = withStyles(styles)(CustomerProfilePageComponent);
