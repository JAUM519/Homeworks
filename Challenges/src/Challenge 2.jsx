import PropTypes from "prop-types";

const Props = ( {title = "Challenge 2",sum = 10} ) => {
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