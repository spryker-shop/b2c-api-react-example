import { WithRouter, IComponent, IIndexSignature } from '@interfaces/common';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IPageContentProps  extends WithStyles<typeof styles>, IComponent, WithRouter {
    classes: IIndexSignature;
    dispatch?: Function;
    isLoading?: boolean;
    locale?: string | null;
    initApplicationDataAction?: Function;
    getCustomerCartsAction?: Function;
    isAppDataSet?: boolean;
    isCustomerAuth?: boolean;
    anonymId?: string;
    cartCreated?: boolean;
    isInitStateFulfilled?: boolean;
    clearSearchTermAction?: () => void;
    setAuthFromStorageAction?: Function;
    isPageLocked?: boolean;
}

export interface IPageContentState {
    topOffset: number | string;
    isPageLocked: boolean;
}
