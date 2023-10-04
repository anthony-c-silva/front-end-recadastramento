<template>
   <q-layout view="lHh LpR lFf">
    <Navbar class="fixed-top header" style="z-index: 999;" ></Navbar>
    <Breadcrumbs style="margin-top: 70px; margin-bottom: -30px;"></Breadcrumbs>
    <q-page-container class="content-container">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import Navbar from 'src/components/navbar/the-navbar.vue';
import Breadcrumbs from 'src/components/global/breadcrumbs.vue'

export default {
  name:'homeLayout',
  components:{Navbar, Breadcrumbs}
};
</script>
<style>
.content-container {
  padding-top: 50px;
}
</style>
