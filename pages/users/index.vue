<template>
  <div>
    <input v-model="userId" type="text" />
    <button @click="onLoadUser">Load User</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
// import Header from '../../components/Header'

// @Component({
//   components: { Header },
// })
@Component
export default class Users extends Vue {
  userId: string = ''

  onLoadUser(): void {
    this.$router.push('/users/' + this.userId)
  }

  layout() {
    return 'users'
  }
}
</script>
