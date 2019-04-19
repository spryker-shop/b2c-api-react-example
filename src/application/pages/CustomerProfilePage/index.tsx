import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { ICustomerProfilePageProps as Props } from './types';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { UpdateProfile } from './UpdateProfile';
import { ChangePassword } from './ChangePassword';
import { AccountActions } from './AccountActions';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

@connect
class CustomerProfilePageBase extends React.Component<Props> {
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
            return (
                <>
                    <div>
                        <FormattedMessage id={ 'word.loading.title' }  />
                    </div>
                </>
            );
        }

        return (
            <>
                <ErrorBoundary>
                    <UpdateProfile
                        customerReference={ this.props.customerReference }
                    />

                    <ChangePassword
                        customerReference={ this.props.customerReference }
                    />

                    <AccountActions
                        customerReference={ this.props.customerReference }
                        routerPush={ this.props.routerPush }
                    />
                </ErrorBoundary>
            </>
        );
    }
}

export const CustomerProfilePage = withStyles(styles)(CustomerProfilePageBase);
