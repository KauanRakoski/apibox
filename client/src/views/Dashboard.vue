<template>
  <div>
    <Header v-bind:img="getUser().photoURL" :mode="'blue'" :cId="costumerId" />
    <div class="hello">
      <h1>
        <span class="secondary">Welcome,</span><br />
        {{ getUser().displayName }}.
      </h1>
    </div>

    <div class="tasks" v-if="UserTasks.length <= 0">
      <h2>Here are your tasks:</h2>
      <div class="noTasks">
        <img src="../assets/desert.svg" width="150px" height="150px" />
        <h3>It seems that you do not have any task yet...</h3>
      </div>
    </div>

    <div class="tasks" v-else>
      <h2>Here are your tasks:</h2>

      <div class="task-container" v-for="task in UserTasks" :key="task">
        <Task v-bind:content="task" v-on:refresh-tasks="f" />
      </div>
    </div>



    <div class="newTask">
      <router-link to="/new">
        <button class="add-btn">Create a New Task</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "../components/multi-pages/Header";
import swal from 'sweetalert'
import Task from "../components/Task";
import utilities from "../helpers/utilites";

export default {
  name: "Dashboard",
  components: {
    Header,
    Task,
  },
  data() {
    return {
      fetchUrl: "http://localhost:3030/getdata/",
      UserTasks: [],
      costumerId: "",
    };
  },
  methods: {
    getUser() {
      let userInfo = localStorage.getItem("AuthUser");
      return JSON.parse(userInfo);
    },
    async fetchUserData(user) {
      try {
        let tasks = await fetch(`${this.fetchUrl + user}/`, { method: "POST" });
        let json = await tasks.json();

        this.UserTasks = json;
        
      } catch (e) {
        swal( "Something went wrong", "Unable to request tasks", "error" )
      }
    },
    async f(taskId) {
      fetch(`http://localhost:3030/delete/${taskId}`, { method: "POST" }).then(
        () => {
          this.fetchUserData(this.getUser().uid);
        }
      );
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
      }
      )
    
  },
  async mounted() {
    this.user = firebase.auth().currentUser || false;

    if (this.user) {
      localStorage.setItem("AuthUser", JSON.stringify(this.user))
      await this.fetchUserData(this.user.uid);
    } else {
      await this.fetchUserData(this.getUser().uid);
    }
  },
};
</script>

<style scoped>
.hello {
  padding: 1.5em 1em;
  font-family: "Inter", sans-serif;
  background-color: #4460f1;
}
.hello .secondary {
  font-size: 21px;
  font-weight: 500;
}
.newTask {
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
  padding: 1em;
}
.noTasks{
  padding: 1em;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.noTasks h3{
  margin-top: 15px;
}
.add-btn {
  margin-top: 20px;
  cursor: pointer;
  border-radius: 40px;
  padding: 0.9em 1.2em;
  background-color: #ffffff;
  border: 2px solid #4460f1;
  font-family: "Inter", sans-serif;
  font-size: 17px;
  color: #4460f1;
  text-decoration: none;
  font-weight: 400;
  font-family: "Inter", sans-serif;
}
h1 {
  font-weight: 400;
  font-size: 30px;
  margin-bottom: 9px;
  color: white;
}
h2 {
  color: white;
  font-weight: 300;
  font-size: 20px;
}
.tasks {
  background-image: linear-gradient(
    to bottom,
    #4460f1,
    #4460f1 100px,
    transparent 100px,
    transparent 100px
  );
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.task-container {
  margin-bottom: 1em;
  z-index: 99;
}
</style>
