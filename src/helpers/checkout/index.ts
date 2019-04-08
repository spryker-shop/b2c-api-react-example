import { ICheckoutPageProps } from '@application/pages/CheckoutPage/types';
import { ICheckoutAddressState } from '@interfaces/checkout';
import { IAddressItem, IAddressItemCollection } from '@interfaces/addresses';
import { IParamFormValidity, IParamInputValidity } from './types';
import { TAddressType, TExtraOptionsToSelection } from '@constants/checkout/types';
import { checkoutSelectionInputs } from '@constants/checkout';
import { RegExpZipCode } from '@constants/forms/regexp';
import { FormattedMessageTemplate } from '@helpers/formattedMessageTemplate';

export const addressDefault: IAddressItem = {
    firstName: '',
    lastName: '',
    salutation: '',
    address1: '',
    address2: '',
    address3: '',
    zipCode: '',
    city: '',
    country: '',
    company: '',
    phone: '',
};

export const getExtraOptionsToSelection = (
    isAddressesCollectionExist: boolean,
    addressType: TAddressType): TExtraOptionsToSelection | null => {
    const response: TExtraOptionsToSelection = [];

    if (!isAddressesCollectionExist) {
        return null;
    }

    if (addressType === 'delivery') {
        response.push({
            value: checkoutSelectionInputs.isAddNewDeliveryValue,
            label: FormattedMessageTemplate('add.new.delivery.address.label')
        });
    } else if (addressType === 'billing') {
        response.push(
            {
                value: checkoutSelectionInputs.isAddNewBillingValue,
                label: FormattedMessageTemplate('add.new.billing.address.label')
            },
            {
                value: checkoutSelectionInputs.isSameAsDeliveryValue,
                label: FormattedMessageTemplate('same.ass.current.delivery.address.label')
            }
        );
    }

    return response;
};

export const getDefaultAddressId = (
    collection: ICheckoutPageProps['addressesCollection'],
    addressType: TAddressType) => {
    if (!collection || !collection.length) {
        return null;
    }
    const variantData = collection
        .filter((item: IAddressItemCollection) => {
            if (addressType === 'delivery') {
                return item.isDefaultShipping === true;
            } else if (addressType === 'billing') {
                return item.isDefaultBilling === true;
            } else {
                return false;
            }
        });

    return ((variantData && variantData[ 0 ]) ? variantData[ 0 ].id : null);
};

export const checkFormInputValidity = (param: IParamInputValidity): boolean => {
    const { value, fieldConfig } = param;
    if (!value && fieldConfig.isRequired) {
        return false;
    }
    if (fieldConfig.inputName === 'zipCode' && typeof value === 'string') {
        const regExp = new RegExp(RegExpZipCode);
        const result = regExp.test(value);

        return result;
    }

    return true;
};

export const checkFormValidity = (param: IParamFormValidity): boolean => {
    const { form, fieldsConfig } = param;
    let result: boolean = true;

    for (const field in form) {
        const { value } = form[ field ];
        const cleanValue = typeof value === 'string' ? value.trim() : value;

        if (form[ field ].isError || (fieldsConfig[ field ].isRequired && !cleanValue)) {
            result = false;
        }
    }

    return result;
};

export const getAddressForm = (address: ICheckoutAddressState): IAddressItem => {
    let payloadAddress: IAddressItem = addressDefault;

    Object.keys(address).map((field: string) => {
        const { value } = address[ field ];
        payloadAddress = { ...payloadAddress, [ field ]: typeof value === 'string' ? value.trim() : value };
    });

    payloadAddress = { ...payloadAddress, iso2Code: payloadAddress.country };
    delete payloadAddress.country;

    return payloadAddress;
};
