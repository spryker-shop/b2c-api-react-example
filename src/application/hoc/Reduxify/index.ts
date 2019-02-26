import { connect, MapDispatchToPropsParam, MapStateToProps, MergeProps, Options } from 'react-redux';

export const reduxify = (
    mapStateToProps: Function,
    mapDispatchToProps?: Function,
    mergeProps?: MergeProps<{}, {}, {}, {}>,
    options?: Options<{}, {}, {}, {}>,
) => (target: any) => connect(
    mapStateToProps as MapStateToProps<{}, {}, {}>,
    mapDispatchToProps as MapDispatchToPropsParam<{}, {}>,
    mergeProps,
    options,
)(target) as any;
