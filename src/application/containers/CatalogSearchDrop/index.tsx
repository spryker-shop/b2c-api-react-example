import * as React from 'react';
import { withRouter } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { CatalogSearch } from '@application/containers/CatalogSearch';
import { PopoverWrapper } from '@application/components/PopoverWrapper';
import { SearchIcon, CrossIcon } from './icons';
import { ClickEvent } from '@interfaces/common';
import { IUserDropNavigationProps as Props, IUserDropNavigationState as State } from './types';
import { styles } from './styles';

@(withRouter as Function)
class CatalogSearchDropComponent extends React.Component<Props, State> {
    public readonly state: State = {
        anchorElement: null
    };

    protected iconButton: React.RefObject<HTMLDivElement> = React.createRef();

    public componentDidUpdate = (prevProps: Props): void => {
        if (this.props.location !== prevProps.location) {
            this.closePopover();
        }
    };

    protected openPopover = ({ currentTarget }: ClickEvent): void => this.setState({ anchorElement: currentTarget });

    protected closePopover = (): void => this.setState({ anchorElement: null });

    public render(): JSX.Element {
        const { anchorElement } = this.state;
        const { classes } = this.props;

        return (
            <>
                <IconButton
                    buttonRef={ this.iconButton }
                    aria-label="person"
                    onClick={ this.openPopover }
                    className={ classes.iconButton }
                >
                    <SearchIcon />
                </IconButton>

                <PopoverWrapper
                    anchorElement={ anchorElement }
                    anchorReference="anchorEl"
                    hideBackdrop={ false }
                    closePopoverHandler={ this.closePopover }
                    classes={{
                        backdrop: classes.backdrop,
                        content: classes.content
                    }}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'right'
                    }}
                >
                    <div className={ classes.searchLayout }>
                        <IconButton
                            aria-label="close"
                            onClick={ this.closePopover }
                            className={ classes.searchCloseButton }
                        >
                            <CrossIcon />
                        </IconButton>
                        <CatalogSearch id={ '2' } extraInputClassName={ classes.searchComponent } />
                    </div>
                </PopoverWrapper>

            </>
        );
    }
}

export const CatalogSearchDrop = withStyles(styles)(CatalogSearchDropComponent);
