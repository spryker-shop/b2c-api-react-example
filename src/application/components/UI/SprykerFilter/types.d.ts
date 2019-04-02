import { WithStyles } from '@material-ui/core';
import { styles } from '@application/components/UI/SprykerFilter/styles';
import { Breakpoint } from '@material-ui/core/es/styles/createBreakpoints';

interface IMenuItemsDropdown {
    value: string | number;
    doc_count: string | number;
}

export interface ISprykerFilterProps extends WithStyles<typeof styles> {
    attributeName?: string;
    handleChange?: Function;
    menuItems?: IMenuItemsDropdown[];
    activeValues?: string[];
    extraClassName?: string;
    isShowSelected?: boolean;
    handleClose?: Function;
    width: Breakpoint;
    isFullWidth: boolean;
}

export interface ISprykerFilterState {
    isOpen: boolean;
}
