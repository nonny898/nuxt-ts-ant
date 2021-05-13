import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

export interface ToDoInterFace {
  toDoList: Array<{ id: number; description: string }>
  counter: number
}

@Module({
  name: 'todos',
  stateFactory: true,
  namespaced: true,
})
export default class ToDo extends VuexModule implements ToDoInterFace {
  public toDoList: { id: number; description: string }[] = []
  public counter: number = 0

  get getCounter(): number {
    return this.counter
  }

  @Mutation
  public ADD_TODO(todo: { id: number; description: string }): void {
    this.toDoList.push(todo)
    this.counter++
  }

  @Mutation
  public REMOVE_TODO(id: number): void {
    this.toDoList = this.toDoList.filter((todo) => {
      return todo.id !== id
    })
  }
}
