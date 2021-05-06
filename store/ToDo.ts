import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

interface ToDoInterFace {
  ToDoList: Array<{ id: number; description: string }>
  counter: number
}

@Module({
  name: 'todos',
  stateFactory: true,
  namespaced: true,
})
export default class ToDo extends VuexModule {
  public toDos: ToDoInterFace = {
    ToDoList: [],
    counter: 0,
  }

  get counter(): number {
    return this.toDos.counter
  }

  @Mutation
  public addToDo(id: number, description: string) {
    this.toDos.ToDoList.push({ id, description })
  }
}
