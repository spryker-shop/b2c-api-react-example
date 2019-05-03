import { RouteComponentProps } from 'react-router-dom';
import { WithRouter } from '@interfaces/common';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { Breakpoint } from '@material-ui/core/es/styles/createBreakpoints';

export interface IAppPaginationProps extends WithStyles<typeof styles>, RouteComponentProps, WithRouter {
    classes: { [key: string]: string };
    pagination: IPagination;
    onChangeHandler: (value: number | string) => void;
    extremePagesLimit?: number;
    nearbyPagesLimit?: number;
    isAddURLParam?: boolean;
    width: Breakpoint;
}

export interface IAppPaginationState {
    pagination: JSX.Element[] | null;
}

export interface IPagination {
    numFound: number;
    currentPage: number;
    maxPage: number;
    currentItemsPerPage: number;
    validItemsPerPageOptions: number[];
}
