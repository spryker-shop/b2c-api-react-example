import NumberFormat from 'react-number-format';

export interface IInputMaskProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { value: string, name: string } }) => void;
    name: string;
}
