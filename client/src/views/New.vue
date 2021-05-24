<template>
  <div class="master">
    <Header :img="getUser().photoURL" :mode="'white'" />
    <div class="content">
      <h3 v-if="$route.params.task == undefined">✨ Add a new task</h3>
      <h3 v-else>📝 Edit task</h3>

      <form @submit.prevent="submit()" id="form" method="POST">
        <div class="i-group">
          <label for="name">Name of the task:</label>
          <input
            name="name"
            id="name"
            placeholder="i.e Great Sausage"
            required
            maxlength="15"
          />
        </div>

        <div class="i-group">
          <label for="description">Description:</label>
          <input
            name="description"
            id="description"
            placeholder="i.e Starts cooking a sausage"
            required
            maxlength="20"
          />
        </div>

        <div class="i-group">
          <label for="key">Select a key: </label>
          
          <select required name="key" id="key" class="form-select pr-1">
            <option value="slider">Slider</option>
            <option value="click">Click</option>
          </select>
          
        </div>

        <div class="i-group">
          <label for="code">Action:</label>
          <div class="before">
            <img src="https://i.ibb.co/wKm3dwr/settings.png" />JavaScript
          </div>
          <codemirror class="editor" v-model="code" :options="cmOptions" />
          <div class="after">
            <p>Sandbox</p>
            <a @click="runTest()"
              ><img src="https://i.ibb.co/W29t3kB/play-button-arrowhead.png" />
              Run</a
            >
          </div>
        </div>

        <button v-if="$route.params.task" type="submit" class="button btn-main">
          Save task data
        </button>
        <button v-else type="submit" class="button btn-main">
          Create new task
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "../components/multi-pages/Header";
import axios from "axios";
import Swal from "sweetalert2";
import utilities from "../helpers/utilities";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/dracula.css";

export default {
  name: "New",
  components: {
    Header,
    codemirror,
  },
  data() {
    return {
      postRoute: `${process.env.VUE_APP_DOMAIN}`,
      code: 'console.log("Hello World")',
      cmOptions: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "dracula",
        lineNumbers: true,
        line: true,
      },
    };
  },
  methods: {
    getUser() {
      let userInfo = localStorage.getItem("apibox-user");
      let jsonInfo = JSON.parse(userInfo);

      return jsonInfo;
    },
    async submit() {
      let name = document.getElementById("name").value;
      let description = document.getElementById("description").value;
      let key = document.getElementById("key").value;

      try {
        if (!this.$route.params.task) {
          await axios.post(`${this.postRoute}/add/${this.getUser().uid}`, {
            name: name,
            key: key,
            description: description,
            action: this.code,
          });
          console.log("hello");
        } else {
          await axios.post(
            `${this.postRoute}/edit/${this.$route.params.task._id}`,
            {
              name: name,
              key: key,
              description: description,
              action: this.code,
            }
          );
          console.log("hello");
        }
      } catch (e) {
        utilities.showError(e);
      }

      this.$router.push("/dashboard");
    },
    async runTest() {
      var res = await axios.post(`${this.postRoute}/api/sandbox`, {
        code: this.code,
      });

      Swal.fire({
        title: `${res.data.details}`,
        icon: "info",
        text: `Response: ${res.data.response}`,
      });
      console.log(res.data);
    },
  },
  mounted() {
    if (this.$route.params.task != undefined) {
      document.getElementById("name").value = this.$route.params.task.name;
      document.getElementById(
        "description"
      ).value = this.$route.params.task.description;
      document.getElementById("key").value = this.$route.params.task.key;

      this.code = this.$route.params.task.action;
    }
  },
};
</script>

<style scoped>
@import url("https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css");

.vue-codemirror {
  width: 400px;
}
.before {
  display: flex;
  align-items: center;
  font-weight: 500;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  width: 100%;
  color: white;
  background-color: #282a36;
  padding: 0.4em 1em;
}
.before img {
  width: 16px;
  margin-right: 10px;
}
.after {
  width: 100%;
  background-color: #383a49;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
.after img {
  transform: scale(0.9);
}
.after p {
  color: white;
  margin: 0px 0 0 20px;
  font-family: "Inter", sans-serif;
  font-weight: bold;
}
.after a {
  border-bottom-right-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  color: white;
  height: 100%;
  width: 80px;
  padding: 5px;
  background-color: #33b277;
  border: none;
}
.after a:hover {
  text-decoration: none;
  color: white;
  background-color: #30a56f;
}
body {
  overflow-x: hidden;
}

.code {
  width: 380px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h3 {
  text-align: center;
  font-family: "Inter", sans-serif;
  font-weight: 600;
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
  margin-bottom: 15px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.i-group label {
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: bold;
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
/* select{
    padding: 0.3em 0.8em;
    border-radius: 3px;
} */
@media only screen and (max-width: 490px) {
  form {
    width: 360px;
    padding: 1em;
  }
  .i-group {
    max-width: 330px;
  }
}
</style>