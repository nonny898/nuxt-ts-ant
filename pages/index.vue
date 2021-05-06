<template>
  <div class="container">
    <a-layout>
      <a-layout-header>
        <div class="title">Ant To Do</div>
      </a-layout-header>
      <a-layout-content>
        <div class="todo__container">
          <div class="todo__form">
            <a-form-model
              ref="ruleForm"
              :model="form"
              :rules="rules"
              layout="inline"
            >
              <a-form-model-item ref="description" prop="description">
                <a-input
                  v-model="form.description"
                  placeholder="New Item"
                  @blur="
                    () => {
                      $refs.description.onFieldBlur()
                    }
                  "
                />
              </a-form-model-item>
              <a-form-model-item>
                <a-button
                  type="primary"
                  :disabled="form.description === ''"
                  @click="onSubmit"
                >
                  Create
                </a-button>
                <!-- <a-button style="margin-left: 10px" @click="resetForm">
                  Reset
                </a-button> -->
              </a-form-model-item>
            </a-form-model>
          </div>
          <div class="todo__lists__container">
            <a-config-provider>
              <template #renderEmpty>
                <div style="text-align: center">
                  <a-icon type="smile" style="font-size: 20px" />
                  <p>Data Not Found</p>
                </div>
              </template>
              <div class="config-provider">
                <a-list :data-source="toDos">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <a slot="actions">Remove</a>
                    <a-list-item-meta>
                      <div slot="title">
                        {{ item.description }} with ID: {{ index }}
                      </div>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </div>
            </a-config-provider>
          </div>
        </div>
      </a-layout-content>
      <a-layout-footer>© 2021 Hello There.</a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

interface ToDo {
  id: number
  description: string
}

@Component
export default class Main extends Vue {
  toDos: Array<ToDo> = [
    {
      id: 1,
      description: 'ad',
    },
    {
      id: 1,
      description: 'ad',
    },
  ]

  other: string = ''

  form: object = {
    description: '',
  }

  rules: object = {
    description: [
      {
        required: true,
        message: 'Please input a description',
        trigger: 'blur',
      },
    ],
  }

  get ruleForm(): Vue & { validate: () => boolean } {
    return this.$refs.ruleForm as Vue & { validate: () => boolean }
  }

  async onSubmit(): Promise<boolean> {
    const valid = await this.ruleForm.validate()
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
    }
    return valid
  }

  // resetForm() {
  //   this.$refs.ruleForm.resetFields()
  // }
}
</script>

<style>
.container {
  text-align: center;
}

.container,
.container .ant-layout {
  min-height: 100vh;
}

.container .ant-layout-header,
.container .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}

.title {
  font-size: 2rem;
}

.todo__container {
  display: grid;
  grid-template-rows: 7.2rem auto;
  grid-template-areas: 'form' 'list';
}

.todo__form {
  grid-area: form;
  padding: 1rem;
}

.todo__lists__container {
  grid-area: list;
}
</style>
