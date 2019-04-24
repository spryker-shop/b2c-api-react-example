import { IParamFormValidity, IParamInputValidity } from '@helpers/forms/types';

export const checkFormInputValidity = (param: IParamInputValidity): boolean => {
    const { value, fieldConfig } = param;
    const comparedValue = value.toString();

    if (!Boolean(value) && fieldConfig.isRequired) {
        return false;
    }

    if (Boolean(fieldConfig.minLength)) {
        const { minLength } = fieldConfig;

        return comparedValue.length >= minLength;
    }

    if (Boolean(fieldConfig.isEmail)) {
        /* tslint:disable */
        const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        /* tslint:enable */
        return emailPattern.test(comparedValue);
    }

    return true;
};

export const checkFormValidity = (param: IParamFormValidity): boolean => {
    const { form, fieldsConfig } = param;
    let result: boolean = true;

    for (const field in form) {
        const { value } = form[field];
        const cleanValue = typeof value === 'string' ? value.trim() : value;

        if (form[field].isError || (fieldsConfig[field].isRequired && !cleanValue)) {
            result = false;
        }
    }

    return result;
};
