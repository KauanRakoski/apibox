<template>
  <header :class="mode == 'blue' ? 'blue' : 'white shadow'">
    <router-link to="/dashboard" class="logo">
      <img v-if="mode == 'blue'"
        src="../../assets/jsint-cube-white.svg"
        width="50px"
        height="50px"
      />
      <img
        v-else
        src="../../assets/jsint-cube-blue.svg"
        width="50px"
        height="50px"
      />

      <h2
        :class="
          mode == 'blue' ? 'logo logo-text text-white' : 'logo logo-text text-black'
        "
      >
        apibox
      </h2>
    </router-link>

    <div id="controls">
      <img class="profile-photo" :src="img" @click="toggleMenu" />
      <ul id="menu">
        <li class="li" @click="openDocs">📚 Docs</li>
        <li class="li" @click="installModule()">🧩 Add Module</li>
        <router-link to="/settings" class="li">⚙️ Settings</router-link>
      </ul>
    </div>
  </header>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert'

export default {
  name: "Header",
  props: {
    img: String,
    mode: String,
    cId: String
  },
  data(){
      return{
          server_url: `${process.env.VUE_APP_DOMAIN}`
      }
  },
  methods: {
    toggleMenu() {
      let menu = document.getElementById("menu");

      if (menu.style.opacity != 0) {
        menu.style.opacity = 0;
        menu.style.visibility = "hidden";
      } else {
        menu.style.opacity = 1;
        menu.style.visibility = "visible";
      }
    },
    async installModule(){
        console.log(this.server_url)
        swal({
            text: "Enter a route adress",
            content: "input",
            button: {
            text: "Done",
            closeModal: true,
            },
      }).then(module => {
          axios.post(`${this.server_url}/api/install`, {module})
      })
        
    },
    openDocs() {
      window.open("https://www.github.com/kauanrakoski/apibox", "_blank");
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
.blue {
  background-color: #4460f1;
}
.white {
  background-color: white;
}
.text-white {
  color: #fff;
}
.text-black {
  color: black;
}
.logo {
  height: 80px;
  display: flex;
  align-items: center;
  width: 150px;
  justify-content: space-around;
}
a{
    text-decoration: none;
    color: black;
}

.profile-photo {
  margin-top: 83px;
  width: 50px;
  height: 50px;
  margin-right: 20px;
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
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid #fff;
}
#menu {
  width: 140px;
  box-sizing: border-box;
  opacity: 0;
  visibility: hidden;
  position: relative;
  border-top: 1px solid rgb(180, 180, 180);
  border-bottom: 1px solid rgb(180, 180, 180);
  margin: 15px -50px 0 -70px;
  background-color: #ffffff;
  border-radius: 3px;
  list-style: none;
  transition: opacity 350ms ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0.01em;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
}
.li {
  font-family: "Inter", sans-serif;
  box-sizing: border-box;
  width: 100%;
  font-size: 15px;
  cursor: pointer;
  padding: 0.4em 0.4em;
}
.li:hover {
  background-color: rgb(28, 117, 217);
  color: white;
}
.li a {
  text-decoration: none;
  text-emphasis-color: white;
}
.logo{
    margin-left: 20px;
}

@media only screen and (max-width: 700px) {
}
</style>