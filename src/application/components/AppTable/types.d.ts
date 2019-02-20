import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface ICellInfo {
    id: string;
    colSpan?: number | null;
    rowSpan?: number | null;
    content: JSX.Element | string | number;
    extraClassName?: string;
}

export interface ITableRow {
    id: string;
    cells?: ICellInfo[];
    isRowHover?: boolean;
}

export interface IAppTableProps extends WithStyles<typeof styles> {
    headerCells: ICellInfo[] | null;
    bodyRows: ITableRow[];
    footerCells?: ICellInfo[] | null;
    isResponsive?: boolean;
    width?: number;
}
