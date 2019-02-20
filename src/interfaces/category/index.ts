export interface ICategory {
    nodeId: number;
    order: number;
    name: string;
    children: ICategory[] | object;
}

export interface IBreadcrumbItem {
    nodeId: number;
    name: string;
    current?: boolean;
}
