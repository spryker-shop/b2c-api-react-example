import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { PopoverOrigin } from '@material-ui/core/Popover';

export interface IPopoverWrapperProps extends WithStyles<typeof styles> {
    anchorElement: HTMLElement | null;
    closePopoverHandler: () => void;
    extraContentClassName?: string;
    extraLayoutClassName?: string;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
}
