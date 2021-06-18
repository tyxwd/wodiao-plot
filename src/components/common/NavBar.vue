<template>
  <div class="nav_bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="mid">
      <slot name="mid"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.nav_bar {
  display: flex;
  line-height: 6.5vh;
  height: 6.5vh;
  /*导航栏颜色，但不建议在这里设置*/
  /*background-color: aqua;*/
  text-align: center;
  /*导航栏下加阴影*/
  box-shadow: 0 1px 1px var(--color-border);
}

.left {
  width: 15%;
}

.right {
  width: 20%;
}

.mid {
  flex: 1;
}
</style>