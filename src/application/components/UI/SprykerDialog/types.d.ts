import * as React from 'react';

export interface ISprykerDialogProps {
    title?: string;
    content: JSX.Element;
    extraClasses?: string;
    handleShow: (event: React.SyntheticEvent<{}>) => void;
    handleAgree: (event: React.MouseEvent<HTMLElement>) => void;
    handleDisagree: (event: React.MouseEvent<HTMLElement>) => void;
    isOpen: boolean;
    titleAgree?: string;
    titleDisagree?: string;
}
