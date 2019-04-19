import { WithStyles } from '@material-ui/core';
import { styles } from '@components/UI/SprykerDialog/styles';
import * as React from 'react';

export interface ISprykerDialogProps extends WithStyles<typeof styles> {
    title?: string;
    content: string;
    extraClasses?: string;
    handleShow: (event: React.SyntheticEvent<{}>) => void;
    handleAgree: (event: React.MouseEvent<HTMLElement>) => void;
    handleDisagree: (event: React.MouseEvent<HTMLElement>) => void;
    isOpen: boolean;
    titleAgree?: string;
    titleDisagree?: string;
}
