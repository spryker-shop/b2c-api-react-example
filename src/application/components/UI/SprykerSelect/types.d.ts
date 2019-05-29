import { WithStyles } from '@material-ui/core';
import { styles } from '@components/UI/SprykerSelect/styles';
import * as React from 'react';

interface IMenuItemSelect {
    value: string | number;
    name: string | number | JSX.Element;
}

interface IMenuItemFirst extends IMenuItemSelect {
    selected?: boolean;
    disabled?: boolean;
}

export interface ISprykerSelectProps extends WithStyles<typeof styles> {
    currentMode: string | number | boolean;
    onChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>, child: JSX.Element) => void;
    name: string;
    menuItems: IMenuItemSelect[];
    menuItemFirst?: IMenuItemFirst | null;
    title?: string;
    label?: string | JSX.Element;
    isRequired?: boolean;
    isFullWidth?: boolean;
    placeholder?: boolean;
    isSimple?: boolean;
    isError?: boolean;
}

export interface ISprykerSelectState {
    isOpen: boolean;
}
