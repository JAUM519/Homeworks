import { useState } from 'react'
import PropTypes from 'prop-types'

export function FirstApp({ defaultValue }) {
  const [counter, setCounter] = useState(defaultValue)

  const handleAdd = () => setCounter(counter + 1)
  const handleSubstract = () => setCounter(counter - 1)
  const handleReset = () => setCounter(defaultValue)

  return (
    <>
      <h1>First App</h1>
      <span>{counter}</span>

      <div>
        <button onClick={handleAdd}>+1</button>
        <button onClick={handleSubstract}>-1</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  )
}

FirstApp.propTypes = {
  defaultValue: PropTypes.number.isRequired,
}

FirstApp.defaultProps = {
  defaultValue: 1,
}
