import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementBy, reset } from '../store/slices/counterSlice'

export default function Counter() {
  const value = useSelector((s) => s.counter.value)
  const dispatch = useDispatch()

  const handleIncrementByPrompt = () => {
    const str = window.prompt('¿Cuánto deseas incrementar?')
    if (str === null) return
    const val = Number(str)
    if (!Number.isFinite(val)) return
    dispatch(incrementBy(val))
  }

  return (
    <section style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
      <h2>Counter (Redux)</h2>
      <p><strong>Valor:</strong> {value}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={handleIncrementByPrompt}>Incrementar por valor…</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </section>
  )
}
