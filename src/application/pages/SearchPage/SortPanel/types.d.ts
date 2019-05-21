import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IFoundItemsProps } from './FoundItems/types';
import { IPagination } from '@containers/AppPagination/types';
import { IActiveSort } from '@interfaces/searchPageData';
import { IIndexSignature } from '@interfaces/common';

export interface ISortPanelProps extends WithStyles<typeof styles> {
    foundItems?: React.SFC<IFoundItemsProps>;
    isProductsExist?: boolean;
    currentSort?: string;
    sortParams?: string[];
    currentItemsPerPage?: number;
    pagination?: IPagination;
    sortParamLocalizedNames?: IIndexSignature;
    setSortAction?: (activeSortOptions: IActiveSort) => void;
}

export interface ISortPanelState extends IActiveSort {}
