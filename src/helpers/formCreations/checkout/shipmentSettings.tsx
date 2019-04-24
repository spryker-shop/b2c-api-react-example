import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { IShippingMethodsParams } from './types';
import { IFormSettings } from '@application/components/UI/SprykerForm/types';
import { IShipmentMethod } from '@interfaces/checkout';
import { AppPrice } from '@application/components/AppPrice';
import { FormattedMessage } from 'react-intl';

export const getShipmentMethodsFormSettings = (formName: string, params: IShippingMethodsParams): IFormSettings => {
    const {
        shipmentMethods,
        currentValueShipmentMethod,
        carrierName,
        shipmentCarrierNameToIcon,
        submitHandler,
        inputChangeHandler
    } = params;

    const formSettings: IFormSettings = {
        formName,
        onChangeHandler: inputChangeHandler,
        onSubmitHandler: submitHandler,
        fields: [
            [
                {
                    type: 'radio',
                    inputName: 'shipmentMethodSelection',
                    inputValue: currentValueShipmentMethod,
                    spaceNumber: 12,
                    isItemsInRow: true,
                    isRequired: false,
                    label: carrierName,
                    labelIcon: shipmentCarrierNameToIcon[carrierName] ? shipmentCarrierNameToIcon[carrierName] : null,
                    isError: false,
                    radioItems: getRadioItems(shipmentMethods)
                }
            ]
        ]
    };

    return formSettings;
};

const getRadioItems = (collection: IShippingMethodsParams['shipmentMethods']) => {
    const items = convertShipmentsToRadioItems(collection);

    if (!items) {
        return null;
    }

    return items;
};

const isShippingMethodsExist = (collection: IShippingMethodsParams['shipmentMethods']) => (
    Boolean(collection && Array.isArray(collection) && collection.length > 0)
);

const convertShipmentsToRadioItems = (collection: IShippingMethodsParams['shipmentMethods']) => ((
    isShippingMethodsExist(collection)
        ? collection.map((item: IShipmentMethod) => ({value: item.id, label: createRadioItemLabel(item)}))
        : null
));

const createRadioItemLabel = (shipmentMethod: IShipmentMethod) => {
    const response: React.ReactNode[] = [];

    if (shipmentMethod.name) {
        response.push(
            <Typography key={`text-${shipmentMethod.id}`}
                        align="left"
                        component="p"
                        color="inherit"
            >
                {shipmentMethod.name}
            </Typography>
        );
    }

    if (shipmentMethod.price) {
        response.push(
            <AppPrice key={`price-${shipmentMethod.id}`} value={shipmentMethod.price} />
        );
    }

    if (shipmentMethod.taxRate) {
        response.push(
            <Typography key={`taxRate-${shipmentMethod.id}`}
                        align="left"
                        component="p"
                        color="inherit"
            >
                <FormattedMessage id={'shipment.tax.rate.label'} /> {`: ${shipmentMethod.taxRate}`}
            </Typography>
        );
    }

    return response;
};
