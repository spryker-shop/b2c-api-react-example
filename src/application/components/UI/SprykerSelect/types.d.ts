import { WithStyles } from '@material-ui/core';
import { styles } from '@components/UI/SprykerSelect/styles';
import * as React from 'react';

interface IMenuItemSelect {
    value: string | number;
    name: string | number | React.ReactNode;
}

interface IMenuItemFirst extends IMenuItemSelect {
    selected?: boolean;
    disabled?: boolean;
}

export interface ISprykerSelectProps extends WithStyles<typeof styles> {
    currentMode: string | number | boolean;
    onChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>, child: React.ReactNode) => void;
    name: string;
    menuItems: IMenuItemSelect[];
    menuItemFirst?: IMenuItemFirst | null;
    title?: string;
    label?: string;
    isRequired?: boolean;
    isFullWidth?: boolean;
    placeholder?: boolean;
    isSimple?: boolean;
}

export interface ISprykerSelectState {
    isOpen: boolean;
}
