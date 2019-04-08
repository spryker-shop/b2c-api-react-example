import { WithStyles } from '@material-ui/core';
import { styles } from '@pages/CheckoutPage/CheckoutLoginStep/styles';
import { ICheckoutStepsCompletionState } from '@interfaces/checkout';
import { ClickEvent } from '@interfaces/common';

export interface ICheckoutSummaryStepProps extends WithStyles<typeof styles> {
    stepsCompletion: ICheckoutStepsCompletionState;
    isSendBtnDisabled: boolean;
    sendData: (event: ClickEvent) => void;
}
