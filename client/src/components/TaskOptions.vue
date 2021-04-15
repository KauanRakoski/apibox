<template>
  <div>
    <div @click="toogleOptions(task._id)" class="dot-container">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>

    <ul class="options" v-bind:id="task._id">
      <li @click="editTask"><a><span>✏️</span> Edit</a></li>
      <li @click="deleteTaskRequest"><a><span>🗑️</span> Delete</a></li>
      <li @click="runOnServer(task._id)"><a><span>💻</span> Server</a></li>
      <li @click="qrCode(task._id)"><a><img width="16px" src="../assets/share-option.svg"> Share</a></li>
    </ul>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  name: "TaskOptions",
  data() {
    return {
      serverUrl:
        "https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io",
    };
  },
  props: {
    task: Object,
  },
  methods: {
    toogleOptions(id) {
      let optionsMenu = document.getElementById(id);
      if (optionsMenu.style.opacity > 0) optionsMenu.style.opacity = 0;
      else optionsMenu.style.opacity = 1;
    },
    getUser() {
      let userInfo = localStorage.getItem("AuthUser");
      return JSON.parse(userInfo);
    },
    editTask(){
        this.$router.push({name: 'New', params: {task: this.task}})
    },
    deleteTaskRequest() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover the task data",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$emit("refresh-tasks", this.task._id);
          swal("Task deleted", {
            icon: "success",
          });
        } else return;
      });
    },
    runOnServer(id){
        fetch(`${this.serverUrl}/api/${id}`, {method: "POST"})
        .then((res) => {
            if(res.error){
            swal("Something went wrong", "An error occured", "error")
        }else return res.json()})
        .then(r => {
            swal("Task ran succesfuly", `${r ? `response: ${JSON.stringify(r)}` : ''}`, "success")
        })
        .catch(e => {swal("Something went wrong", "An error occured", "error"); console.log(e)})
    }
  },
};
</script>

<style scoped>
.dot-container {
    position: relative;
    z-index: 99;
  margin: 10px 0 8px 49px;
  height: 21px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
}
.dot {
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: black;
}
.options::before {
  position: absolute;
  top: -10px;
  left: 13px;
  content: '';
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid rgb(239, 239, 239);
}
.options {
  position: relative;
  min-width: 140px;
  z-index: 99;
  margin: 45px -40px -20px 40px;
  opacity: 0;
  list-style: none;
  padding: 0.01em;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}
.options li {
  position: relative;
  z-index: 99;
  display: flex;
  justify-content: flex-start;
  padding: 0.3em 1.2em;
  width: 100%;
  border-radius: 3px;
  font-family: "Inter", sans-serif;
  background-color: #fff;
  margin: 5px 0;
  cursor: pointer;
}
.options li:hover {
  background-color: rgb(28, 117, 217);
  color: white;
}
.options li a {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  text-decoration: none;
}

</style>