<template>
  <div id="app">
    <transition name="page-transition" 
    enter-active-class="animate__animated animate__fadeInUp"
    >
      <router-view>
      </router-view>
    </transition>
  </div>
</template>

<script>


export default {
  name: "App",
  
  watch:{
    $route (){
        window.scrollTo(0,0)
    }
} 
}
</script>
<style>
@import url('https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css');

* {
  margin: 0;
  box-sizing: border-box;
}
body{
    overflow-x: hidden;
}
#app{
  -ms-overflow-style: none;  
  scrollbar-width: none;  
}
.button {
  padding: 0.7em 2em;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-weight: bold;
}
.btn-main {
  color: white;
  background-color: #5469d4;
  text-decoration: none;
}
.btn-main:hover{
    text-decoration: none;
    color: white;
    background-color: #465cc8;
}
.btn-second {
  color: #5469d4;
  background-color: #e5effd;
}
.btn-second:hover {
  background-color: rgb(193, 209, 233);
}

</style>
