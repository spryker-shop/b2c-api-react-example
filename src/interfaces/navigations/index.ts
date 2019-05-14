export interface IMainNavigationNode {
    cssClass?: string | null;
    isActive?: boolean;
    nodeType: string;
    resourceId: number | null | string;
    title: string | JSX.Element;
    url?: string | null;
    validFrom?: boolean | null;
    validTo?: boolean | null;
    children: IMainNavigationNode[];
    additionalItem?: boolean;
}

export interface INavLinkData {
    path: string;
    title: string;
    extraClassName?: string;
    icon?: React.ReactNode;
    isWishlist?: boolean;
}
