import create, { SetState } from 'zustand'

type ToDo = {
  toDo: string
  isDone: boolean
}

type ToDoStore = {
  toDos: ToDo[]
  toggleToDo: (index: number) => void
  addToDo: (toDo: ToDo) => void
  deleteToDo: (index: number) => void
}

const useStore = create<ToDoStore>((set) => ({
  toDos: [],
  toggleToDo: (index) =>
    set((state) => {
      const foundToDo = state.toDos.find(
        (_: ToDo, i: number): boolean => i === index
      )
      if (foundToDo) {
        foundToDo.isDone = !foundToDo.isDone
        return {
          toDos: [
            ...state.toDos.slice(0, index),
            foundToDo,
            ...state.toDos.slice(index + 1),
          ],
        }
      }
    }),
  addToDo: (toDo: ToDo) => set((state) => ({ toDos: [...state.toDos, toDo] })),
  deleteToDo: (index) =>
    set((state) => {
      const ToDosWithoutToDoFoundOnIndex: ToDo[] = state.toDos.filter(
        (_: ToDo, i: number): boolean => i !== index
      )
      return {
        toDos: ToDosWithoutToDoFoundOnIndex,
      }
    }),
}))

export default useStore
