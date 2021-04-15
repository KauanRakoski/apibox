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
            maxlength="15"
          />
        </div>

        <div class="i-group">
          <label for="key">Select a key: </label>
          <select required name="key" id="key">
            <option value="slider">Slider</option>
            <option value="click">Click</option>
          </select>
        </div>

        <div class="i-group">
          <label for="code">Action:</label>
          <runkit :source="code" ref="runkit"  node-version="14.16.0" class="code"/>
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
/* import swal from 'sweetalert' */
import utilities from "../helpers/utilities";
import firebase from 'firebase';
import runkit from 'vue-runkit';
 

export default {
  name: "New",
  components: {
    Header,
    runkit
  },
  data() {
    return {
      postRoute: "https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io",
      code: 'console.log("Hello World")',
    };
  },
  methods: {
    getUser() {
      let userInfo = localStorage.getItem("AuthUser");
      let jsonInfo = JSON.parse(userInfo);
      
      return jsonInfo;
    },
    async submit() {
        var notebook = this.$refs.runkit.notebook
        const src = notebook.getSource()
        console.log(src)
        var r = src._rejectionHandler0
        console.log(r)
        let name = document.getElementById("name").value;
        let description = document.getElementById("description").value;
        let key = document.getElementById("key").value;
        
        try {
            if (!this.$route.params.task) {
            await axios.post(`${this.postRoute}/add/${this.getUser().uid}`, {
                name: name,
                key: key,
                description: description,
                action: r
            });
            console.log("hello")
            } else {
            await axios.post(
                `${this.postRoute}/edit/${this.$route.params.task._id}`,
                { name: name, key: key, description: description, action: r }
            );
            console.log("hello")
            }
        }catch(e){
            utilities.showError(e)
        }

        this.$router.push("/dashboard");
    },
    },
    beforeMount(){
        if(firebase.auth().currentUser == null || firebase.auth().currentUser == undefined){
        let userInfo = localStorage.getItem("AuthUser")
        var jsonInfo = JSON.parse(userInfo)
        } else jsonInfo = firebase.auth().currentUser
        
        utilities.checkUserSubscription(jsonInfo.email)
        .then(subscription => {
        if(subscription == undefined) this.$router.push('/subscribe')
        this.costumerId = subscription.id
        })
        .catch(e => utilities.showError(e))
    },
  mounted() {
      
      if (this.$route.params.task != undefined) {
      document.getElementById("name").value = this.$route.params.task.name;
      document.getElementById(
        "description"
      ).value = this.$route.params.task.description;
      document.getElementById("key").value = this.$route.params.task.key;

      this.code = this.$route.params.task.action
      this.$refs.runkit.notebook.setSource(this.$route.params.task.action)
    }

    
  },
};
</script>

<style scoped>
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