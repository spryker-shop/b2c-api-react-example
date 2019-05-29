import * as React from 'react';
import { connect } from './connect';
import { ICustomerProfileProps as Props } from './types';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { UpdateProfile } from './UpdateProfile';
import { ChangePassword } from './ChangePassword';
import { DeleteAccount } from './DeleteAccount';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { Preloader } from '@components/Preloader';

@connect
class CustomerProfileComponent extends React.Component<Props> {
    public componentDidMount = ():void => {
        if (!this.props.isCustomerDataExist) {
            this.initRequestData();
        }
    };

    public componentDidUpdate = ():void => {
        if (!this.props.isRejected && !this.props.isCustomerDataExist) {
            this.initRequestData();
        }
    };

    protected initRequestData = ():void => {
        if (!this.props.isLoading && this.props.isAppDataSet && this.props.customerReference) {
            this.props.getCustomerProfileAction(this.props.customerReference);
        }
    };

    public render = (): JSX.Element => {
        const { customerReference, isCustomerDataExist } = this.props;
        if (!isCustomerDataExist) {
            return <Preloader isStatic />;
        }

        return (
            <>
                <ErrorBoundary>
                    <UpdateProfile customerReference={ customerReference } />
                </ErrorBoundary>
                <ErrorBoundary>
                    <ChangePassword customerReference={ customerReference } />
                </ErrorBoundary>
                <ErrorBoundary>
                    <DeleteAccount customerReference={ customerReference } />
                </ErrorBoundary>
            </>
        );
    }
}

export const CustomerProfile = withStyles(styles)(CustomerProfileComponent);
