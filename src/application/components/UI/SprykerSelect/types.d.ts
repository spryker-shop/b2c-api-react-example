import { WithStyles } from '@material-ui/core';
import { styles } from '@application/components/UI/SprykerSelect/styles';
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
    changeHandler: (event: React.ChangeEvent<HTMLSelectElement>, child: React.ReactNode) => void;
    name: string;
    menuItems: IMenuItemSelect[];
    menuItemFirst?: IMenuItemFirst | null;
    title?: string;
    label?: string;
    extraLabelClassName?: string;
    isRequired?: boolean;
    isFullWidth?: boolean;
    extraTitleClassName?: string;
    selectClassName?: string;
    menuItemClassName?: string;
    extraRootClassName?: string;
    extraFormControlClassName?: string;
    extraInputRootClassName?: string;
    extraSelectFieldClassName?: string;
}
