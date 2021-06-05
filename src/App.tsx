import React, { useState, ChangeEvent, SyntheticEvent } from 'react'
import './App.css'

type ToDo = {
  toDo: string
  isDone: boolean
}

function App(): JSX.Element {
  const [toDos, setToDo] = useState<ToDo[]>([])
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
              onClick={() => handleToggleToDo(index)}
              className="ToDo__Btn-delete"
            >
              ✔️
            </button>
            <button
              onClick={() => handleDeleteToDo(index)}
              className="ToDo__Btn-delete"
            >
              ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  function handleToggleToDo(index: number): void {
    const foundToDo = toDos.find((_: ToDo, i: number): boolean => i === index)
    if (foundToDo) {
      foundToDo.isDone = !foundToDo.isDone
      setToDo([...toDos.slice(0, index), foundToDo, ...toDos.slice(index + 1)])
    }
  }

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
      setToDo([...toDos, newToDo])
      setInput('')
    }
  }

  function handleDeleteToDo(index: number): void {
    const ToDosWithoutToDoFoundOnIndex: ToDo[] = toDos.filter(
      (_: ToDo, i: number): boolean => i !== index
    )
    setToDo(ToDosWithoutToDoFoundOnIndex)
  }
}

export default App
