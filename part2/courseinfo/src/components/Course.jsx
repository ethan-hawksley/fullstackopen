const Header = ({course}) => <h1>{course}</h1>

const Total = ({sum}) => <p>Number of exercises {sum}</p>

const Part = ({part}) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({parts}) =>
    <>
        {parts.map(part => <Part key={part.id} part={part}/>)}
    </>

const Course = ({course}) => {
    const {id, name, parts} = course
    return (
        <div>
            <Header course={name}/>
            <Content parts={parts}/>
            <Total sum={parts.reduce((i, part) => i + part.exercises, 0)}/>
        </div>
    )
}

export default Course
