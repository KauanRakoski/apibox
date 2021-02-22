<template>
  <div>
    <Header v-bind:img="getUser().photoURL" :mode="'blue'" :cId="costumerId" />
    <div class="hello">
      <h1 v-if="getUser() != null">
        <span  class="secondary">Welcome,</span><br />
        {{ getUser().displayName }}.
      </h1>
      <h1 v-else>
          Welcome
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
import Task from "../components/Task";
import utilities from "../helpers/utilities";

export default {
  name: "Dashboard",
  components: {
    Header,
    Task,
  },
  data() {
    return {
      fetchUrl:
        "https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/getdata/",
      UserTasks: [],
      costumerId: "",
    };
  },
  methods: {
    getUser() {
      let userInfo = localStorage.getItem("AuthUser")
      return JSON.parse(userInfo)
    },
    checkSub(user){
    utilities.checkUserSubscription(user.email)
      .then(async(sub) => {
          let subscription = await sub
        if (subscription == undefined) this.$router.push("/subscribe")
        else this.costumerId = subscription.id;
      })
      .catch((e) => utilities.showError(e));
    },
    async fetchUserData(user) {
      try {
        let tasks = await fetch(`${this.fetchUrl + user}/`, { method: "POST" });
        let json = await tasks.json();

        if (json.error == true) utilities.showError();

        this.UserTasks = json;
      } catch (e) {
        utilities.showError(e);
      }
    },
    async f(taskId) {
      fetch(
        `https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/delete/${taskId}`,
        { method: "POST" }
      )
        .then(() => {
          this.fetchUserData(this.getUser().uid);
        })
        .catch((e) => utilities.showError(e));
    },
  },
  beforeMount() {
    var jsonInfo;

    firebase.auth().onAuthStateChanged(async(user) => {
      if (user) {
        jsonInfo = firebase.auth().currentUser;
        this.checkSub(jsonInfo)
      } else {
        let userInfo = localStorage.getItem("AuthUser");
        jsonInfo = JSON.parse(userInfo)
        this.checkSub(jsonInfo)
      }
    })
  },
  async mounted() {
    var fetchFunc = this.fetchUserData;
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        localStorage.setItem("AuthUser", JSON.stringify(user));
        await fetchFunc(user.uid);
      } else {
        let userInfo = localStorage.getItem("AuthUser");
        await fetchFunc(JSON.parse(userInfo).uid);
      }
    })
  },
}
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
.noTasks {
  padding: 1em;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.noTasks h3 {
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

@media only screen and (max-width: 800px) {
  .add-btn {
    padding: 0.5em 1em;
  }
  .noTasks img{
      width: 100px;
      height: 100px;
  }
  .noTasks h3 {
      text-align: center;
   font-size: 20px;
}
}
</style>
