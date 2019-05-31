import { RouteProps } from 'react-router-dom';
import { IIndexSignature, WithRouter } from '@interfaces/common';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { Breakpoint } from '@material-ui/core/es/styles/createBreakpoints';

export interface IPaginationProps extends WithStyles<typeof styles>, RouteProps, WithRouter {
    classes: IIndexSignature;
    pagination: IPagination;
    onChangeHandler: (value: number | string) => void;
    extremePagesLimit?: number;
    nearbyPagesLimit?: number;
    isAddURLParam?: boolean;
    width: Breakpoint;
}

export interface IPaginationState {
    pagination: JSX.Element[];
}

export interface IPagination {
    numFound: number;
    currentPage: number;
    maxPage: number;
    currentItemsPerPage: number;
    validItemsPerPageOptions: number[];
}
