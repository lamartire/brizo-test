<script>
import { PageTemplate } from 'components'

export default {
  components: {
    PageTemplate,
  },
}
</script>

<template>
  <PageTemplate>
    <router-view />
  </PageTemplate>
</template>

<style lang="stylus">
* {
  box-sizing: border-box;
  font-family: 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', Arial, sans-serif;
}

body {
  padding: 0;
  margin: 0;
  background-color #FFA5A5;
}
</style>
