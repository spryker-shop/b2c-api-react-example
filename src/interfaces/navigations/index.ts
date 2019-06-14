export interface IMainNavigationNode {
    cssClass?: string;
    isActive?: boolean;
    nodeType: string;
    resourceId: number | string;
    title: string | JSX.Element;
    url?: string;
    validFrom?: boolean;
    validTo?: boolean;
    children: IMainNavigationNode[];
    additionalItem?: boolean;
}

export interface INavLinkData {
    path: string;
    title: string;
    extraClassName?: string;
    icon?: JSX.Element;
    isWishlist?: boolean;
}
