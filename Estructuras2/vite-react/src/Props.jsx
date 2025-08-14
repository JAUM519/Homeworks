import PropTypes from "prop-types";

const Props = ( {title = "No hay titulo",sum = 300} ) => {
    return (
        <>
            <h1> { title } </h1>
            <span> { sum } </span>
        </>
    )
}

Props.PropTypes = {
    title: PropTypes.string.isRequired,
    sum: PropTypes.number.isRequired
}

export default Props