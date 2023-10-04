<template>
  <q-layout view="lHh LpR lFf">
   <Navbar class="fixed-top header" style="z-index: 999;" ></Navbar>
   <q-page-container class="content-container">
     <router-view></router-view>
   </q-page-container>
 </q-layout>
</template>
<script lang="ts">
import Navbar from '../components/navbar/the-navbar.vue'

export default{
   name: 'AlunoPage',
   components: { Navbar },
}
</script>
<style>
.header {

}
.content-container {

}
</style>
