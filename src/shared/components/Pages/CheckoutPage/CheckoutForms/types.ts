import { WithStyles } from '@material-ui/core/styles/withStyles';
import {formStyles} from "./styles";
import {ChangeEvent, FormEvent} from "react";
import {IShippingAddress} from "src/shared/interfaces/checkout/index";


export interface ICheckoutFormsProps extends WithStyles<typeof formStyles> {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  shippingAddress: IShippingAddress;
}
