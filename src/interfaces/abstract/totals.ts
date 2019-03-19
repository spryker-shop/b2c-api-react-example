export type TAbstractTotal = number;

export type TExpenseTotal = TAbstractTotal;
export type TDiscountTotal = TAbstractTotal;
export type TTaxTotal = TAbstractTotal;
export type TSubtotal = TAbstractTotal;
export type TGrandTotal = TAbstractTotal;
export type TCanceledTotal = TAbstractTotal;

export interface IAbstractTotals {
    expenseTotal: TExpenseTotal;
    discountTotal: TDiscountTotal;
    taxTotal: TTaxTotal;
    subtotal: TSubtotal;
    grandTotal: TGrandTotal;
}
