<template>
  <div class="master">
    <Header :img="getUser().photoURL" :mode="'white'"/>
    <div class="content">
      <h3>✨ Add a new task</h3>

      <form
        @submit.prevent="submit()"
        id="form"
        method="POST"
      >
        <div class="i-group">
          <label for="name">Name of the task:</label>
          <input name="name" id="name" placeholder="i.e Great Sausage" />
        </div>

        <div class="i-group">
          <label for="description">Description:</label>
          <input
            name="description"
            id="description"
            placeholder="i.e Starts cooking a sausage"
          />
        </div>

        <div class="i-group">
          <label for="key">Select a key: => </label>
          <select name="key" id="key">
            <option value="slider">Slider</option>
            <option value="click">Click</option>
          </select>
        </div>

        <div class="i-group">
          <label for="code">Action:</label>

          <prism-editor class="editor" v-model="code" :highlight="highlighter" line-numbers></prism-editor>
        </div>

        <button type="submit" class="button btn-main">Create new task</button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "../components/multi-pages/Header";
import utilities from "../helpers/utilites";

import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; 


import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

export default {
  name: "New",
  components: {
    Header,
    PrismEditor,
  },
  data() {
    return {
      postRoute:
        "https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/add/",
      code: `() => {

}`,
    };
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); //returns html
    },
    getUser() {
      let userInfo = localStorage.getItem("AuthUser");
      let jsonInfo = JSON.parse(userInfo);
      return jsonInfo;
    },
    submit() {
      let name = document.getElementById("name").value;
      let description = document.getElementById("description").value;
      let key = document.getElementById("key").value;

      fetch(
        `${
          this.postRoute
        }${this.getUser().uid}/?name=${name}&key=${key}&description=${description}&code=${
          this.code
        }`,
        { method: "POST" }
      );
      this.$router.push("/dashboard");
    },
  },
  mounted() {
    var subscription = utilities.checkUserSubscription(this.getUser().email);
    if (subscription == "inactive") this.$router.push("/subscribe");
  },
};
</script>

<style scoped>
body{
    overflow-x: hidden;
}
.editor{
    background-color: #282a36;
    color: #f8f8f2;
    padding: 0.3em 0.1em;
    border-radius: 3px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h3 {
  text-align: center;
  font-family: "Inter", sans-serif;
  margin: 2em 0;
  font-size: 23px;
}
form {
  margin-bottom: 15px;
  padding: 1.5em;
  border-radius: 8px;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3), -2px -2px 3px rgba(0, 0, 0, 0.136);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.i-group {
  margin-bottom: 20px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.i-group label {
  font-family: "Inter", sans-serif;
  font-size: 15px;
  padding: 0.5em;
}
.i-group input {
  width: 100%;
  border: none;
  outline: none;
  border-radius: 8px;
  padding: 1em;
  background-color: rgb(236, 228, 228);
}
textarea {
  width: 100%;
  border: none;
  outline: none;
  border-radius: 8px;
  padding: 1em;
  background-color: rgb(236, 228, 228);
  min-height: 100px;
}
select {
  padding: 0.5em 2em;
  border-radius: 3px;
  border: 1px solid rgb(199, 199, 199);
  cursor: pointer;
  -moz-appearance: none; 
  -webkit-appearance: none; 
  appearance: none;
}
select option {
  font-family: "Inter", sans-serif;
  border-radius: 40px;
  font-size: 15px;
  font-weight: 300;
  border-radius: 88px;
  cursor: pointer;
}
@media only screen and (max-width: 490px){
    form{
        width: 360px;
        padding: 1em;
    }
    .i-group{
        max-width: 330px;
    }
}
</style>