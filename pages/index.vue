<template>
  <div class="container">
    <a-layout :has-sider="true">
      <a-layout-sider
        v-model="collapsed"
        :width="300"
        :collapsed-width="0"
        :trigger="null"
        collapsible
      >
        <div class="empty"></div>
        <div class="logo">INSURE</div>
        <div class="side-bar__links">
          <div class="side-bar__link">Transmittal</div>
          <div class="side-bar__link">Verification</div>
          <div class="side-bar__link">Data Out</div>
          <div class="side-bar__link">Admin Panel</div>
        </div>
      </a-layout-sider>
      <a-layout style="overflow-x: visible">
        <a-layout-header>
          <div class="title">
            <div
              class="header__trigger"
              :class="triggerClass"
              @click="onCollapse"
            ></div>
            <div class="left-header">
              <div class="company">PTTEP</div>
              <div class="project-name">
                Information Submission & Readiness (INSURE)
              </div>
            </div>
            <div class="right-header">
              <div class="header-home">Home</div>
              <div class="header-user">Username</div>
            </div>
          </div>
        </a-layout-header>
        <a-layout-content>
          <Transmittal />
        </a-layout-content>
        <a-layout-footer>© 2021 Hello There.</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Main extends Vue {
  // validate(data: object): boolean {
  //   console.log('🚀 ~ data', data)
  //   return true
  // }

  triggerClass: string = 'trigger__expand'

  collapsed: boolean = false

  onCollapse(): void {
    console.log('this.triggerClass :>> ', this.triggerClass)
    if (this.triggerClass === 'trigger__expand') {
      this.triggerClass = 'trigger__collapse'
      this.collapsed = true
    } else {
      this.triggerClass = 'trigger__expand'
      this.collapsed = false
    }
  }
}
</script>

<style>
.container,
.container .ant-layout {
  min-height: 100vh;
}

.container .ant-layout-header,
.container .ant-layout-footer {
  background: #c7c7c7;
}

.ant-layout-header {
  padding: 0 64px;
}

.empty {
  height: 4rem;
  background: #f0f2f5;
}

.logo {
  height: 6rem;
  background: #4b4b4b;
  color: #fff;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ant-layout-sider {
  background: #fff;
}

.side-bar__link {
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.side-bar__link:hover,
.side-bar__link:active {
  background: #969696;
}

.title {
  justify-content: space-between;
}

.title,
.left-header,
.right-header {
  display: flex;
  position: relative;
}

.header__trigger {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 12px;
  border-radius: 50%;
  background: #353535;
  transition: transform 0.2s ease-out;
}

.trigger__expand {
  transform: translateX(-84px);
}

.trigger__collapse {
  transform: translateX(-52px);
}

.left-header {
  align-items: baseline;
}

.title .company {
  font-size: 2rem;
  font-weight: 700;
}

.title .project-name {
  margin-left: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
}

.header-home,
.header-user {
  font-size: 1rem;
}

.header-home {
  margin-right: 1rem;
}
</style>
