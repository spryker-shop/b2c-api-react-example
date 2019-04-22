import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IShipmentMethod } from '@interfaces/checkout';
import { ICheckoutPageState } from './types';

export interface IShipmentFormProps extends WithStyles<typeof styles> {
    labelForm: {
        [key: string]: {
            icon: JSX.Element
        };
    };
    formName: string;
    onChangeHandler: (payload: string) => void;
    currentMode: string;
    collections: IShipmentMethodsGrouped[];
}
