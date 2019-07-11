import * as React from 'react';
import { PartnerIconDhl, PartnerIconHermes } from './icons';
import { IShipmentMethod, IShipmentMethodLabelData } from '@interfaces/checkout';
import { FormattedMessage } from 'react-intl';

export const shipmentCarrierNameToIconTransformer = (shipmentMethods: IShipmentMethod[]): IShipmentMethodLabelData => {
    const shipmentNames: string[] = shipmentMethods.reduce((accumulator: string[], item: IShipmentMethod) =>
        [...accumulator, item.carrierName], []);
    const uniqShipmentNames: string[] = shipmentNames.filter((item: string, index: number) =>
        shipmentNames.indexOf(item) === index);

    return uniqShipmentNames.reduce((accumulator: IShipmentMethodLabelData, item: string) => {
        accumulator[item] = {
            name: item
        };

        if (item === 'Spryker Dummy Shipment') {
            accumulator[item] = {
                icon: <PartnerIconDhl />,
                name: <FormattedMessage id={ 'shipment.method.dhl.title' } />
            };
        }

        if (item === 'Spryker Drone Shipment') {
            accumulator[item] = {
                icon: <PartnerIconHermes />,
                name: <FormattedMessage id={ 'shipment.method.hermes.title' } />
            };
        }

        return accumulator;
    }, {});
};
