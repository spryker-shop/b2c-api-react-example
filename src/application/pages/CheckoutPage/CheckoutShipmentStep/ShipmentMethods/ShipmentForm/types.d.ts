import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICheckoutPageState } from './types';
import { IShipmentMethod } from '@interfaces/checkout';

export interface IShipmentFormProps extends WithStyles<typeof styles> {
    labelForm: {
        name: JSX.Element | string;
        icon?: JSX.Element;
    };
    formName: string;
    onChangeHandler: (value: string, price: number) => void;
    currentMode: string;
    collections: IShipmentMethod[];
}
