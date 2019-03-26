import { WithStyles } from '@material-ui/core';
import { styles } from '@application/components/UI/SprykerFilter/styles';

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
    title?: string;
    isFullWidth: boolean;
}

export interface ISprykerFilterState {
    isOpen: boolean;
}
