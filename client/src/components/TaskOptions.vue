<template>
  <div>
    <div @click="toogleOptions(taskId)" class="dot-container">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>

    <ul class="options" v-bind:id="taskId">
      <li><a>Edit</a></li>
      <li><button @click="deleteTaskRequest">Delete</button></li>
    </ul>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  name: "TaskOptions",
  data() {
    return {
      BaseDelUrl:
        "https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/delete/",
    };
  },
  props: {
    taskId: String,
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
    deleteTaskRequest() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover the task data",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$emit("refresh-tasks", this.taskId);
          swal("Task deleted", {
            icon: "success",
          });
        } else return;
      });
    },
  },
};
</script>

<style scoped>
.dot-container {
  margin: 10px 0 8px 15px;
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
.options {
  opacity: 0;
  list-style: none;
  padding: 0.1em;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
}
.options li {
  padding: 0.3em 0.5em;
  border-radius: 3px;
  font-family: "Inter", sans-serif;
  background-color: #fff;
  margin: 5px 0;
}
.options li a {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
}
.options li button {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  background-color: #fff;
  border: none;
  cursor: pointer;
}
</style>