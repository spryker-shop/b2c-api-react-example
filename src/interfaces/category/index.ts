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
