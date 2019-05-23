import { IPaymentMethod, IShipmentMethod } from '@interfaces/checkout';
import { ICheckoutResponseData } from '@stores/reducers/pages/checkout/types';
import { ICheckoutRawResponse } from '@services/pages/checkout/types';

export const parseCheckoutData = (response: ICheckoutRawResponse): ICheckoutResponseData => {
    if (!response) {
        return null;
    }
    const { data: { attributes: { addresses, paymentProviders, shipmentMethods } } } = response;

    const payments: IPaymentMethod[] = [];

    Array.isArray(paymentProviders) && paymentProviders.forEach(provider => {
        provider.paymentMethods.forEach(paymentMethod => {
            payments.push({
                ...paymentMethod,
                paymentProviderName: provider.paymentProviderName,
            });
        });
    });

    return ({
        payments,
        shipments: shipmentMethods.map((method: IShipmentMethod) => ({...method, id: method.id.toString()})),
        addressesCollection: Array.isArray(addresses) ? addresses : [],
    });
};
