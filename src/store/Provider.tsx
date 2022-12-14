import Context from './Context';
import { PropsWithChildren, useReducer } from 'react';
import reducer, { initState } from './reducer';

interface Props extends PropsWithChildren<unknown> {

}

function Provider({ children }: Props) {
    const [state, dispatch] = useReducer(reducer, initState);

    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
}

export default Provider;