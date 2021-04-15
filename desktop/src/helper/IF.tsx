import React, { useEffect, useState } from 'react';

interface Props {
    variable: any,
    logic: string,
    check: any;
    children: JSX.Element | Array<JSX.Element> | any
}


const THEN = (props: any) => {
    return (
        <>
            {props.children}
        </>
    )
};

const ELSE = (props: any) => {
    return (
        <>
            {props.children}
        </>
    )
}

const IF = (props: Props) => {

    const { variable, logic, check } = props;
    const [child, setChild] = useState(props.children);

    useEffect(() => {
        setChild(props.children);
    }, [props.variable, props.children])

    const compare = (_variable: any, _logic: string, _check: any): boolean => {
        switch (_logic) {
            case '===':
                return _variable === _check;
            case '!==':
                return _variable !== _check;
            case '>':
                return _variable > _check;
            case '>=':
                return _variable >= _check;
            case '<':
                return _variable < _check;
            case '<=':
                return _variable <= _check;
            default:
                return false
        }
    }

    const renderChildern = (props: Props, type: string): JSX.Element | Array<JSX.Element> | null => {
        if (React.Children.count(child) === 1) {
            if (child.type.name === type) {
                return child;
            } else {
                return null;
            }
        } else if (React.Children.count(child) > 1) {
            return props.children.map((_child: JSX.Element) => {
                if (_child.type.name === type) {
                    return _child;
                } else {
                    return null;
                }
            });
        } else {
            return null;
        }
    }

    const renderIF = () => {
        let render: any;
        if (compare(variable, logic, check)) {
            render = renderChildern(props, 'THEN');
        } else {
            render = renderChildern(props, 'ELSE')
        }
        return render;
    }

    return (
        <>
            {renderIF()}
        </>
    )
}

export default IF;
export { THEN, ELSE };

