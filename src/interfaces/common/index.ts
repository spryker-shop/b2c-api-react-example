import * as React from 'react';

export type ClickEvent = React.MouseEvent<HTMLElement>;
export type InputChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement> ;
export type FormEvent = React.FormEvent<HTMLFormElement>;
export type BlurEvent = React.FocusEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>;

export interface IStyles {
    className?: string;
    style?: {};
}

export interface IComponent extends IStyles {
    children?: React.ReactNode[] | JSX.Element | string;
}

export interface IIndexSignature {
    [key: string]: string;
}

export interface ICategory {
    nodeId: number;
    order: number;
    name: string;
    children: ICategory[] | object;
}

export interface IBreadcrumbItem {
    path: string;
    name: string | JSX.Element;
    current?: boolean;
}

export interface ITotals {
    expenseTotal: number;
    discountTotal: number;
    taxTotal: number;
    subtotal: number;
    grandTotal: number;
}
