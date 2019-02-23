import * as React from 'react';
import { connect } from './connect';
import { withRouter } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { pathCustomerPage, pathCustomerProfilePage, pathLoginPage } from '@constants/routes';
import { UserDrop } from './UserDrop';
import { PopoverWrapper } from '@application/components/PopoverWrapper';
import { BreakpointsSM } from '@constants/breakpoints';
import { logoutSetTimeoutTime } from '@constants/customer';
import { UserIcon } from './icons';
import { ClickEvent } from '@interfaces/common';
import { IUserDropNavigationProps as Props, IUserDropNavigationState as State } from './types';
import { styles } from './styles';

@connect
@(withRouter as Function)
class UserDropNavigationComponent extends React.Component<Props, State> {
    public readonly state: State = {
        anchorElement: null
    };

    protected iconButton: React.RefObject<HTMLDivElement> = React.createRef();

    public componentDidUpdate = (prevProps: Props): void => {
        if (this.props.location !== prevProps.location) {
            this.closePopover();
        }
    };

    protected openPopover = ({ currentTarget }: ClickEvent): void => {
        if (window.innerWidth < BreakpointsSM) {
            if (this.props.isUserLoggedIn) {
                this.props.history.push(pathCustomerProfilePage);
            } else {
                this.props.history.push(pathLoginPage);
            }
        } else {
            this.setState({ anchorElement: currentTarget });
        }
    };

    protected closePopover = (): void => this.setState({ anchorElement: null });

    protected handleLogout = (event: ClickEvent): void => {
        event.preventDefault();
        if (this.props.location.pathname.includes(pathCustomerPage)) {
            this.props.logout();
        } else {
            this.props.history.push(pathCustomerPage);
            setTimeout(this.props.logout, logoutSetTimeoutTime);
        }
    };

    public render(): JSX.Element {
        const { anchorElement } = this.state;
        const { classes, isUserLoggedIn } = this.props;

        return (
            <>
                <IconButton
                    buttonRef={ this.iconButton }
                    aria-label="person"
                    onClick={ this.openPopover }
                    className={ ` ${classes.iconButton} ${!!anchorElement ? classes.isPopupOpened : '' } ` }>
                    <UserIcon />
                </IconButton>

                <PopoverWrapper
                    anchorElement={ anchorElement }
                    closePopoverHandler={ this.closePopover }
                >
                    <UserDrop
                        closePopoverHandler={ this.closePopover }
                        onLogoutClick={ this.handleLogout }
                        isUserLoggedIn={ isUserLoggedIn }
                    />
                </PopoverWrapper>

            </>
        );
    }
}

export const UserDropNavigation = withStyles(styles)(UserDropNavigationComponent);
