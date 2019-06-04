import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IBillingSelectionState, IDeliverySelectionState } from '@interfaces/checkout';
import { IAddressItemCollection } from '@interfaces/addresses';
import { ICountry } from '@interfaces/common';
import { IAddressFormState } from '@interfaces/forms';

export interface ICheckoutSummaryAddressesProps extends WithStyles<typeof styles> {
    addressesCollection: IAddressItemCollection[];
    deliveryNewAddress: IAddressFormState;
    deliverySelection: IDeliverySelectionState;
    billingNewAddress: IAddressFormState;
    billingSelection: IBillingSelectionState;
    countriesCollection: ICountry[];
}
