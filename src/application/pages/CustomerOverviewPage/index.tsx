import * as React from 'react';
import { connect } from './connect';
import { withStyles } from '@material-ui/core';
import { ICustomerOverviewPageProps as Props } from './types';
import { styles } from './styles';
import { OrdersList } from '@containers/OrdersList';
import { AddressesList } from '@components/AddressesList';

@connect
class CustomerOverviewPageComponent extends React.PureComponent<Props> {
    public componentDidMount = ():void => {
        if (!this.props.isCustomerDataExist) {
            this.initRequestData();
        }
    };

    protected initRequestData = ():void => {
        if (!this.props.isLoading && this.props.isAppDataSet && this.props.customerReference) {
            this.props.getCustomerData(this.props.customerReference);
        }
    };

    public render(): JSX.Element {
        const { classes, customerData, isAddressesListInitiated } = this.props;

        return (
            <div>
                { customerData &&
                    <>
                        <div>
                            <span>{ customerData.salutation }</span>
                            {` ${customerData.firstName} ${customerData.lastName}`}
                        </div>

                        <div>{ customerData.email }</div>
                        <AddressesList isMainOnly isEditOnly />

                        { Boolean(isAddressesListInitiated) &&
                            <OrdersList
                                shouldShowEmptyList={ false }
                                shouldShowOrdersAmount={ false }
                                ordersLimit={ 3 }
                            />
                        }
                    </>
                }
            </div>
        );
    }
}

export const CustomerOverviewPage = withStyles(styles)(CustomerOverviewPageComponent);
