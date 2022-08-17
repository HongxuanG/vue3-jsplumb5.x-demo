<template>
  <div class="common-layout">
    <el-container class="outside-container">
      <el-header class="header">
        <h2 class="">流程图-demo</h2>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <div class="menu-item">

            <el-link type="primary" :underline="false" @click="goJSPlumbPage">JSPlumb-demo</el-link>
          </div>
          <div class="menu-item">

            <el-link type="primary" :underline="false" @click="goG6Page">antv-G6-demo</el-link>
          </div>
        </el-aside>
        <el-main>
          <div class="main">

            <RouterView></RouterView>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const goJSPlumbPage = () => {
  router.push({
    name: 'JSPlumbIndex',
  })
}
const goG6Page = () => {
  router.push({
    name: 'G6Index',
  })
}
</script>

<style scoped lang="scss">
.common-layout{
  width: 100vw;
  height: 100vh;
}
.outside-container{
  height: 100vh;
}
.main{
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #f2f2f2;
}
.header{
  background-color: skyblue;
}
.aside{
  background-color: pink;
}
.menu-item{
  padding: 20px 0;
  margin: 10px 0;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  &:hover{
    background-color: #f2f2f2;
  }
}

</style>
