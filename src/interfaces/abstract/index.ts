export interface IAbstractTotals {
    expenseTotal: number;
    discountTotal: number;
    taxTotal: number;
    subtotal: number;
    grandTotal: number;
}

export interface IAbstractRowIncludedResponse {
    type: string;
    links: {
        self: string;
    };
    id?: string;
}
