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

const StatisticLine = ({ text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad}) => {
    if (good + neutral + bad === 0) {
        return (
            <div>
                <Text text='No feedback given' />
            </div>
        )
    }
    return (
        <table>
            <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={good + neutral + bad} />
            <StatisticLine text='average' value={(good - bad) / (good + neutral + bad)} />
            <StatisticLine text='positive' value={(good / (good + neutral + bad) * 100) + ' %'} />
            </tbody>
        </table>

    )
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
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App