<template>
  <div>
    <div class="todo__container">
      <div class="todo__form">
        <a-button type="primary" @click="showModal"> Create Todo </a-button>
        <a-modal v-model="visible" title="Create New To Do">
          <template slot="footer">
            <div class="modal-todo__footer">
              <div class="modal-todo__footer__left">
                <label for="datetime-switch">Date & Time</label>
                <a-switch
                  class="switch-datetime"
                  :checked="toggleDateTime"
                  @click="toggleDateTime = !toggleDateTime"
                />
              </div>
              <a-button key="submit" type="primary" @click="handleOk">
                <!-- :disabled="filledOut" -->
                Create
              </a-button>
              <!-- {{ filledOut() }} -->
            </div>
          </template>
          <a-form-model
            ref="ruleForm"
            layout="vertical"
            :model="form"
            :rules="rules"
          >
            <a-form-model-item ref="title" label="Title" prop="title">
              <a-input
                v-model="form.title"
                @blur="
                  () => {
                    $refs.title.onFieldBlur()
                  }
                "
              />
            </a-form-model-item>
            <a-form-model-item
              ref="description"
              label="Description"
              prop="description"
            >
              <a-input
                v-model="form.description"
                @blur="
                  () => {
                    $refs.description.onFieldBlur()
                  }
                "
              />
            </a-form-model-item>
          </a-form-model>
          <a-form-model v-if="toggleDateTime" layout="vertical" :model="form">
            <a-row>
              <a-col :span="24">
                <a-form-model-item label="Date">
                  <a-date-picker
                    v-model="form.date"
                    format="YYYY-MM-DD"
                    :disabled-date="disabledDate"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-model-item label="Start Time">
                  <a-time-picker
                    v-model="form.startTime"
                    :default-open-value="initialTime"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item label="End Time">
                  <a-time-picker
                    v-model="form.endTime"
                    :default-open-value="initialTime"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
            <!-- @change="onChange" -->
          </a-form-model>
        </a-modal>
      </div>
      <div class="todo__lists__container">
        <!-- <a-config-provider>
              <template #renderEmpty>
                <a-empty />
              </template>
              <div class="config-provider">
                <a-list bordered :data-source="toDosLocal">
                  <a-list-item slot="renderItem" slot-scope="item">
                    <a slot="actions" @click="remove(item.id)">
                      <a-icon type="delete" />
                    </a>
                    <a-list-item-meta>
                      <div slot="title">
                        {{ item.description }} with ID: {{ item.id }}
                      </div>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </div>
            </a-config-provider> -->
        <div v-if="toDosLocal.length === 0" class="empty__todo">
          <a-empty />
        </div>
        <div v-else class="exist__todo">
          <a-card v-for="todo in toDosLocal" :key="todo.id">
            <div class="container-todo__list">
              <div class="todo__list__description">
                {{ todo.description }}
              </div>
              <div class="todo__list__remove"></div>
            </div>
            <a slot="extra" @click="remove(todo.id)">
              <a-icon type="delete" />
            </a>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, namespace } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import moment from 'moment'

const todos = namespace('todos')

interface ToDo {
  id: number
  description: string
}

interface Form {
  title: string
  description: string
  date: any
  startTime: any
  endTime: any
}

interface IValid extends Vue {
  validate(): boolean
}

@Component({
  // omit the namespace argument ('myModule') if you are not using namespaced modules
  computed: mapState('todos', ['toDoList']),
})
export default class Main extends Vue {
  toDosLocal: Array<ToDo> = []

  visible: boolean = false

  toggleDateTime: boolean = false

  initialTime: object = moment('00:00:00', 'HH:mm:ss')

  form: Form = {
    title: '',
    description: '',
    date: null,
    startTime: null,
    endTime: null,
  }

  rules: object = {
    title: [
      {
        required: true,
        message: 'Please input a title',
        trigger: 'blur',
      },
    ],
    description: [
      {
        required: true,
        message: 'Please input a description',
        trigger: 'blur',
      },
    ],
  }

  @todos.State
  public toDoList!: { id: number; description: string }[]

  @todos.Getter
  public getCounter!: number

  @todos.Mutation
  public ADD_TODO!: (todo: ToDo) => void

  @todos.Mutation
  public REMOVE_TODO!: (id: number) => void

  mounted() {
    this.importToDoStore()
    this.form = {
      title: '',
      description: '',
      date: null,
      startTime: null,
      endTime: null,
    }
  }

  @Watch('toDoList')
  onListChanged() {
    this.importToDoStore()
  }

  $refs!: {
    ruleForm: IValid
  }

  importToDoStore(): void {
    this.toDosLocal = this.toDoList
  }

  showModal(): void {
    this.visible = true
  }

  disabledDate(current: object): boolean {
    return current && current < moment().startOf('day')
  }

  async handleOk(): Promise<void> {
    const valid = await this.$refs.ruleForm.validate()
    console.log('🚀 ~ valid', valid)
    if (valid) {
      // console.log(
      //   'this.form :>> ',
      //   this.form.date.format('MMMM Do YYYY, h:mm:ss a')
      // )
      // this.ADD_TODO({ id: this.getCounter, description: this.form.description })
      // this.form.description = ''
      // this.visible = false
    } else {
      console.error('error submit!!')
      this.visible = true
    }
  }

  remove(id: number): void {
    this.REMOVE_TODO(id)
  }
}
</script>

<style scoped>
.todo__container {
  display: grid;
  grid-template-areas: 'form' 'list';
}

.todo__form,
.todo__lists__container {
  padding: 1rem;
}

.todo__form {
  grid-area: form;
  display: flex;
  justify-content: flex-end;
}

.modal-todo__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-todo__footer__left,
.modal-todo__footer label {
  display: flex;
}

.switch-datetime {
  margin-left: 1rem;
}

.todo__lists__container {
  grid-area: list;
}

.ant-card {
  margin-bottom: 1rem;
  border-radius: 18px;
}
</style>
