import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { PopoverOrigin, PopoverReference } from '@material-ui/core/Popover';

export interface IPopoverWrapperProps extends WithStyles<typeof styles> {
    anchorElement?: HTMLElement | null;
    closePopoverHandler: () => void;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
    openPopup?: boolean | null;
    paperProps?: {};
    hideBackdrop?: boolean;
    anchorReference?: PopoverReference;
    anchorPosition?: { top: number, left: number };
}
