import { ICheckoutStepsCompletionState } from '@interfaces/checkout';
import { ClickEvent } from '@interfaces/common';

export interface ICheckoutRoutingProps {
    stepsCompletion: ICheckoutStepsCompletionState;
    isSendBtnDisabled: boolean;
    sendData: (event: ClickEvent) => void;
}
