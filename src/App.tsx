import React, { useState, ChangeEvent, SyntheticEvent } from 'react'
import './App.css'
import useStore from './store/store'

type ToDo = {
  toDo: string
  isDone: boolean
}

function App(): JSX.Element {
  const { toDos, toggleToDo, addToDo, deleteToDo } = useStore((state) => state)
  const [input, setInput] = useState<string>('')

  return (
    <div className="App">
      <form onSubmit={handleAddToDo}>
        <input value={input} onChange={handleOnChange} />
        <button>Add ToDo</button>
      </form>
      {toDos.map((toDo: ToDo, index: number) => (
        <div className="ToDo" key={toDo.toDo}>
          <p className={toDo.isDone ? 'Done' : ''}>{toDo.toDo}</p>
          <div className="ToDo__Btn-wrapper">
            <button
              onClick={() => toggleToDo(index)}
              className="ToDo__Btn-delete"
            >
              ✔️
            </button>
            <button
              onClick={() => deleteToDo(index)}
              className="ToDo__Btn-delete"
            >
              ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  function handleOnChange(event: ChangeEvent<HTMLInputElement>): void {
    const input: string = event.target.value
    setInput(input)
  }

  function handleAddToDo(event: SyntheticEvent): void {
    event.preventDefault()
    if (input) {
      const newToDo: ToDo = {
        toDo: input,
        isDone: false,
      }
      addToDo(newToDo)
      setInput('')
    }
  }
}

export default App
