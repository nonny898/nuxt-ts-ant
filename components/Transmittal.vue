<template>
  <div class="main-container">
    <div class="container-transmittal">
      <div class="header-transmittal">
        <div class="header-transmittal__title">Transmittal</div>
        <div class="header-transmittal__search">
          <a-input-search
            placeholder="input search text"
            style="width: 200px"
          />
        </div>
      </div>
      <div class="body-transmittal">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="Subsurface">
            <SubsurfaceTable />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Drawing" force-render>
            Content of Tab Pane 2
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  padding: 1rem;
  height: 100%;
}
.main-container,
.container-transmittal {
  height: 100%;
}
.container-transmittal {
  display: flex;
  border: 1px solid black;
  flex-direction: column;
}
.header-transmittal {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
}
.header-transmittal .header-transmittal__title {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
