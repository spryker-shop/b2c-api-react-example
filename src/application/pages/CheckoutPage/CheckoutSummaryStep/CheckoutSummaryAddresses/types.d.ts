import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IBillingSelectionState, IDeliverySelectionState } from '@interfaces/checkout';
import { IAddressItemCollection } from '@interfaces/addresses';
import { ICountry } from '@interfaces/addresses';
import { IAddressFormState } from '@interfaces/forms';

export interface ICheckoutSummaryAddressesProps extends WithStyles<typeof styles> {
    addressesCollection: IAddressItemCollection[] | null;
    deliveryNewAddress: IAddressFormState;
    deliverySelection: IDeliverySelectionState;
    billingNewAddress: IAddressFormState;
    billingSelection: IBillingSelectionState;
    countriesCollection: ICountry[];
}
