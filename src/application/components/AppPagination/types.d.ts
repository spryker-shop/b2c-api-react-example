import * as React from 'react';
import { RouteProps } from 'react-router';
import { WithRouter } from '@interfaces/common';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface IAppPaginationProps extends WithStyles<typeof styles>, RouteProps, WithRouter {
    pagination: IPagination;
    onChangeHandler: (event: React.ChangeEvent<{}>, value: number | string) => void;
    step?: number;
    isAddURLParam?: boolean;
}

export interface IAppPaginationState {}

export interface IPagination {
    numFound: number;
    currentPage: number;
    maxPage: number;
    currentItemsPerPage: number;
    validItemsPerPageOptions: number[];
}
