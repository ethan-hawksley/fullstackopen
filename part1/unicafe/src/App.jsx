import {useState} from 'react'

const Title = (props) => {
    return (<h1>{props.text}</h1>)
}

const Button = (props) => {
    return (<button onClick={props.handleClick}>{props.text}</button>)
}

const Text = (props) => {
    return (<p>{props.text}</p>)
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    console.log(good, neutral, bad)

    return (
        <div>
            <Title text='give feedback' />
            <Button handleClick={() => setGood(good + 1)} text='good'/>
            <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
            <Button handleClick={() => setBad(bad + 1)} text='bad'/>
            <Title text='statistics' />
            <Text text={'good ' + good} />
            <Text text={'neutral ' + neutral} />
            <Text text={'bad ' + bad} />
        </div>
    )
}

export default App