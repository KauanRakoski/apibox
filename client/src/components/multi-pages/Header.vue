<template>
  <header :class="mode == 'blue' ? 'blue' : 'white shadow'">
    <div class="logo">
      <img class="logoImg" src="../../assets/controlLogo.svg" width="35px" height="35px" />
      <h2 :class="mode == 'blue' ? 'logo-text text-white' : 'logo-text text-black'">Control</h2>
    </div>

    <div id="controls">
      <img class="profile-photo" :src="img" @click="toggleMenu" />
      <ul id="menu">
        <li @click="logOut">Sign Out</li>
        <li>Cancel Subscription</li>
      </ul>
    </div>
  </header>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Header",
  props: {
    img: String,
    mode: String
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      localStorage.removeItem("AuthUser");
    },
    toggleMenu() {
      let menu = document.getElementById("menu");

      if (menu.style.opacity != 0) menu.style.opacity = 0;
      else menu.style.opacity = 1;
    },
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
  margin-top: 90px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
.logo-text {
  margin-top: 7px;  
  font-family: "Inter", sans-serif;
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
  left: 21px;
  content: '';
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid #fff;
}
#menu {
  box-sizing: border-box;
  opacity: 0;
  position: relative;
  border-top: 1px solid rgb(180, 180, 180); 
  border-bottom: 1px solid rgb(180, 180, 180);
  margin-top: 15px;
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
#menu li {
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  padding: 0.4em 0.4em;
}
#menu li:hover{
    background-color: rgb(28, 117, 217);
    color: white;
}
</style>