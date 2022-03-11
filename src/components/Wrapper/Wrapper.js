import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Wrapper = (props) => {
    return (
        <Fragment>
            <MainNavigation />
            <main>{props.children}</main>
        </Fragment>
    );
};

export default Wrapper;
