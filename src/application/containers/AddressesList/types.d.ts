import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IAddressItem } from '@interfaces/addresses';
import { WithRouter } from '@interfaces/common';

export interface IAddressesListProps extends WithStyles <typeof styles>, WithRouter {
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
