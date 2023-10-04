<template>
  <div class="q-pl-md q-ml-lg breadcrumb">
    <ul>
      <li
        v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        @click="routeTo(idx)"
        :class="{'linked': !!breadcrumb.link}"
        >
          <span style="font-size: 1.2em;"><q-icon :name="breadcrumb.icon" style="size: 40px; margin-right: .5rem;"></q-icon>{{ breadcrumb.name }}</span>
        </li>
    </ul>
  </div>
</template>
  
<script>
  export default {
    name: 'BreadCrumb',
    data () {
      return {
        breadcrumbList: []
      }
    },
    mounted () { this.updateList() },
    watch: { '$route' () { this.updateList() } },
    methods: {
      routeTo (pRouteTo) {
        if (this.breadcrumbList[pRouteTo].link) this.$router.push(this.breadcrumbList[pRouteTo].link)
      },
      updateList () { this.breadcrumbList = this.$route.meta.breadcrumb }
    }
  }
</script>
  
<style scoped lang="scss">
  .breadcrumb {}
  ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  ul > li {
    display: flex;
    float: left;
    height: 10px;
    width: auto;
    color: #5a97e6;
    font-weight: bold;
    font-size: 1.2em;
    cursor: default;
    align-items: center;

    @media screen and (max-width: 768px) {
      font-size: 1em;
    }

  }
  
  ul > li:not(:last-child)::after {      
    content: '/';
    float: right;
    font-size: 2em;
    margin: 0 .5em;
    color: #8fb5e6;
    cursor: default;
  }
  
  .linked {
    cursor: pointer;
    font-size: 1em;
    font-weight: normal;
  }
</style>