import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import {
    IBillingAddressState,
    ICheckoutAddressState,
    IBillingSelectionState,
    IDeliverySelectionState
} from '@interfaces/checkout';
import { IAddressItemCollection } from '@interfaces/addresses';
import { ICountry } from '@interfaces/country';

export interface ICheckoutSummaryAddressesProps extends WithStyles<typeof styles> {
    addressesCollection: IAddressItemCollection[] | null;
    deliveryNewAddress: ICheckoutAddressState;
    deliverySelection: IDeliverySelectionState;
    billingNewAddress: IBillingAddressState;
    billingSelection: IBillingSelectionState;
    countriesCollection: ICountry[];
}
