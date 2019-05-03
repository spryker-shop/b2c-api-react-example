import * as React from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';

export interface Styles {
    className?: string;
    style?: React.CSSProperties;
}

export interface Component extends Styles {
    children?: React.ReactNode[] | React.Element | string;
}

export type ClickEvent = React.MouseEvent<HTMLElement>;
export type InputChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement |
    HTMLSelectElement> ;
export type FormEvent = React.FormEvent<HTMLFormElement>;
export type BlurEvent = React.FocusEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>;

export interface WithRouter extends Partial<RouteComponentProps<RouteProps>> {

}

export interface IStyles {
    className?: string;
    style?: {};
}

export interface IComponent extends IStyles {
    children?: React.ReactNode[] | React.Element | string;
}
