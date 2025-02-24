const History  = (props) => {
    const {allClicks} = props

    if(allClicks.length == 0){
        return (
            <div>
                Start the app by pressing the button.
            </div>
        )
    }

    return (
        <div>
            The History of clicks : {allClicks.join(' ')}
        </div>
    )
}

export default History;