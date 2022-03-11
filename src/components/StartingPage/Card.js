import classes from './Card.module.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Card = (props) => {
    const [width, setWidth] = useState(window.innerWidth);
    const breakPoint = 980;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);


        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return (
        <div>
            {width > breakPoint ? (
                <div className={classes.card}>
                    <Link to={`/details/${props.id}`}><h4>{props.title}</h4></Link>
                    <Link to={`/${props.id}`}>
                        <div className={classes.info}>
                            <h6>{props.location}</h6>
                            <div className={classes.row}>
                                <p>{props.salary}</p>
                            </div>
                            <div className={classes.row}>
                                <p>{props.type}</p>
                            </div>
                            <p>{props.description}</p>
                        </div>
                    </Link >
                </div >
            ) : (
                <div className={classes.card}>
                    <Link to={`/details/${props.id}`}><h4>{props.title}</h4>
                        <div className={classes.info}>
                            <h6>{props.location}</h6>
                            <div className={classes.row}>
                                <p>{props.salary}</p>
                            </div>
                            <div className={classes.row}>
                                <p>{props.type}</p>
                            </div>
                            <p>{props.description}</p>
                        </div>
                    </Link >
                </div >
            )}
        </div>
    )

}


export default Card