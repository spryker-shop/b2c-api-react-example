export interface ICheckoutFormsProps {
    panels: {
        first: IPanelData;
        second: IPanelData;
        third: IPanelData;
        fourth: IPanelData;
    };
}

export interface IPanelData {
    title: React.ReactNode;
    isDisabled: boolean;
}
