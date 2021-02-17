<template>
  <header :class="mode == 'blue' ? 'blue' : 'white shadow'">
    <div class="logo">
      <img v-if="mode == 'blue'" src="../../assets/jsint-cube-white.svg" width="50px" height="50px"/>
      <img v-else src="../../assets/jsint-cube-blue.svg" width="50px" height="50px"/>
      <h2 :class="mode == 'blue' ? 'logo-text text-white' : 'logo-text text-black'">jsint</h2>
    </div>

    <div id="controls">
      <img class="profile-photo" :src="img" @click="toggleMenu" />
      <ul id="menu">
        <li class="li" id="li1" @click="logOut">Sign Out</li>
        <li class="li" id="li2" @click="eraseUser">Unsubscribe</li>
        <li class="li" @click="openDocs">Documentation</li>
      </ul>
    </div>
  </header>
</template>

<script>
import firebase from "firebase";
import axios from 'axios'
import swal from "sweetalert";

export default {
  name: "Header",
  props: {
    img: String,
    mode: String,
    cId: String
  },
  methods: {
    spinner(id){
        let item = document.getElementById(id)
        item.removeChild(item.childNodes[0])

        item.innerHTML = `<div class="text-center"><div class="spinner-border text-primary" style="width: 1.2rem; height: 1.2rem;" role="status"></div></div>`
    },
    logOut() {
      this.spinner('li1')
      firebase.auth().signOut();
      localStorage.removeItem("AuthUser")
    },
    toggleMenu() {
      let menu = document.getElementById("menu");

      if (menu.style.opacity != 0){
        menu.style.opacity = 0;
        menu.style.visibility = 'hidden'
      }
      else{ 
        menu.style.opacity = 1
         menu.style.visibility = 'visible'
      }
    },
    eraseUser(){
      swal({
        title: "Are you sure?",
        text: "This action can not be undone. All your data will be deleted.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
           this.spinner('li2')  
          let userData = JSON.parse(localStorage.getItem("AuthUser"))
         
          axios.post(`https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/payment/cancel/${this.cId}/${userData.uid}`)
          .then(this.logOut) 
          
        } else return
      })
    },
    openDocs(){
      window.open('https://www.github.com/hipesoft/jsint', '_blank')
    }
  },
};
</script>

<style scoped>
header {
  margin: 0;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0 1em;
}
.blue{
    background-color: #4460f1;
}
.white{
    background-color:white;
}
.text-white{
    color: #fff;
}
.text-black{
    color: black;
}
.logo {
  height: 80px;
  display: flex;
  align-items: center;
  width: 150px;
  justify-content: space-around;
}
.profile-photo {
  margin-top: 120px;
  width: 50px;
  height: 50px;
  margin-right: 30px;
  border-radius: 50%;
  cursor: pointer;
}
.logo-text {
  margin-top: 7px;  
  font-family: "Comfortaa", sans-serif;
  font-weight: 300;
  font-size: 30px;
}
.controls {
  position: relative;
  max-width: 60px;
  max-height: 60px;
  padding: 0;
}

#menu::before {
  position: absolute;
  top: -10px;
  left: 90px;
  content: '';
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid #fff;
}
#menu {
  width: 120px;
  box-sizing: border-box;
  opacity: 0;
  visibility: hidden;
  position: relative;
  border-top: 1px solid rgb(180, 180, 180); 
  border-bottom: 1px solid rgb(180, 180, 180);
  margin: 15px -50px 0 -70px ;
  background-color: #ffffff;
  border-radius: 4px;
  list-style: none;
  transition: opacity 350ms ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0.01em;
  box-shadow: 2px 2px 6px rgba(0,0,0,.3);
}
.li {
  font-family: "Inter", sans-serif;
  box-sizing: border-box;
  width: 100%;
  font-size: 15px;
  cursor: pointer;
  padding: 0.4em 0.4em;
}
.li:hover{
    background-color: rgb(28, 117, 217);
    color: white;
}
.li a{
  text-decoration: none;
  text-emphasis-color: white;
}


@media only screen and (max-width: 700px){
  
}
</style>