import { IComponent, IIndexSignature } from '@interfaces/common';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { RouteComponentProps } from 'react-router-dom';

export interface IPageContentProps  extends WithStyles<typeof styles>, IComponent, Partial<RouteComponentProps> {
    classes: IIndexSignature;
    dispatch?: Function;
    isLoading?: boolean;
    locale?: string;
    initApplicationDataAction?: Function;
    getCustomerCartsAction?: Function;
    isAppDataSet?: boolean;
    isCustomerAuth?: boolean;
    anonymId?: string;
    isCartCreated?: boolean;
    isInitStateFulfilled?: boolean;
    clearSearchTermAction?: () => void;
    setAuthFromStorageAction?: Function;
    isPageLocked?: boolean;
}

export interface IPageContentState {
    topOffset: number | string;
    isPageLocked: boolean;
}
