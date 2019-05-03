export interface IConfigInputState {
    value: string | number | boolean;
    isError?: boolean;
}

export interface IConfigInputStable {
    inputName: string;
    isRequired?: boolean;
    isEmail?: boolean;
    minLength?: number;
}
