

const List = (props) => {
    return (
        <div>
            <ul>
                <li>{props.title}</li>
                <li>{props.salary}</li>
                <li>{props.location}</li>
            </ul>
        </div>
    )
}

export default List