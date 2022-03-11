import classes from './footer.module.css'
import { Icon } from '@iconify/react';

const Footer = () => {
    return (
        <footer className={classes.mainC}>
            <div>
                <h3><Icon id="icon" icon="logos:react" width="40" height="40" /></h3>
            </div>

            <div>
                <h6>Made By Furman Walker</h6>
            </div>

            <div className={classes.copy}>
                <h6>© Copyright 2021-2022.<br></br>All rights reserved</h6>
            </div>

        </footer>
    )
}

export default Footer