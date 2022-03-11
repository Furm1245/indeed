const DetailList = (props) => {
    return (
        <div>
            <ul>
                <li>{props.name}</li>
                <li>{props.number}</li>
                <li>{props.email}</li>
                <li>{props.age}</li>
                <li>{props.experience}</li>
            </ul>
        </div>
    )
}

export default DetailList