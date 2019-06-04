import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IAddressItem } from '@interfaces/addresses';
import { RouteComponentProps } from 'react-router-dom';

export interface IAddressesListProps extends WithStyles <typeof styles>, Partial<RouteComponentProps> {
    isLoading?: boolean;
    customer?: string;
    addresses?: IAddressItem[];
    deleteAddressAction?: Function;
    setCurrentAddressAction?: Function;
    routerPush?: Function;
    getAddressesAction?: Function;
    isMainOnly?: boolean;
    isEditOnly?: boolean;
    isInitiated?: boolean;
}
