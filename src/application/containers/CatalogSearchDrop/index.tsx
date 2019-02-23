import * as React from 'react';
import { withRouter } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { CatalogSearch } from '@application/containers/CatalogSearch';
import { PopoverWrapper } from '@application/components/PopoverWrapper';
import { SearchIcon } from './icons';
import { ClickEvent } from '@interfaces/common';
import { IUserDropNavigationProps as Props, IUserDropNavigationState as State } from './types';
import { styles } from './styles';

@(withStyles(styles) as Function)
@(withRouter as Function)
export class CatalogSearchDrop extends React.Component<Props, State> {
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
                    className={ classes.iconButton }>
                    <SearchIcon />
                </IconButton>

                <PopoverWrapper
                    anchorElement={ anchorElement }
                    closePopoverHandler={ this.closePopover }
                    extraContentClassName={ classes.content }
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'right'
                    }}
                >
                    <CatalogSearch id={ '2' } />
                </PopoverWrapper>

            </>
        );
    }
}
