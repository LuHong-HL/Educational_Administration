<template>
  <div class="home">
    <Nav></Nav>
    <Header></Header>
    <routerView></routerView>
    <Footer></Footer>
  </div>
</template>

<script>
    import Nav from './components/Nav'
    import Header from './components/Header'
    import Footer from './components/Footer'
  export default {
      components:{
        Nav,
        Header,
        Footer
      }

  }

</script>

<style scoped>

</style>
