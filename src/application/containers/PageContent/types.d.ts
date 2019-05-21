import { WithRouter, IComponent, IIndexSignature } from '@interfaces/common';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IPageContentProps  extends WithStyles<typeof styles>, IComponent, WithRouter {
    classes: IIndexSignature;
    dispatch?: Function;
    isLoading?: boolean;
    locale?: string | null;
    initApplicationData?: Function;
    setAuth?: Function;
    getCustomerCart?: Function;
    getGuestCart?: Function;
    isAppDataSet?: boolean;
    isCustomerAuth?: boolean;
    anonymId?: string;
    cartCreated?: boolean;
    isInitStateFulfilled?: boolean;
    clearSearchTerm?: () => void;
    isPageLocked?: boolean;
}

export interface IPageContentState {
    topOffset: number | string;
    isPageLocked: boolean;
}
