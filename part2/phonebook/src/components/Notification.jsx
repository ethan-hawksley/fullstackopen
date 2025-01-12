const Notification = ({ message, type }) => {
    console.log(type)

    if (message === null) {
        return null
    }

    return (
        <div className={type}>
            {message}
        </div>
    )
}

export default Notification
