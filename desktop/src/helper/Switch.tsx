import React from 'react';

const CASE = (props: any) => {
    return (
        <>
            {props.children}
        </>
    )
}

const DEFAULT = (props: any) => {
    return (
        <>
            {props.children}
        </>
    )
}

const SWITCH = (props: any) => {
    const { variable } = props;
    var counter = 0;

    const renderCase = () => {
        return props.children.map((child: any) => {
            if (child.props.check === variable) {
                counter++;
                return child;
            } else {
                if (child.props.check === undefined && child.props.check !== variable && child.type.name === "DEFAULT" && counter === 0) {
                    return child;
                } else {
                    return null;
                }
            }
        });
    }

    return (
        <>
            {renderCase()}
        </>
    )
}

export default SWITCH;
export { CASE, DEFAULT };

