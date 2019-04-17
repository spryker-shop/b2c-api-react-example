import { IParamFormValidity, IParamInputValidity } from '@helpers/forms/types';

export const checkFormInputValidity = (param: IParamInputValidity): boolean => {
    const { value, fieldConfig } = param;
    if (!value && fieldConfig.isRequired) {
        return false;
    }
    if (fieldConfig.inputName === 'zipCode' && typeof value === 'string') {
        const zipCodeMinDigits = 5;

        return value.length >= zipCodeMinDigits;
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
