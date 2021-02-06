<template>
  <div>
    <div @click="toogleOptions(taskId)" class="dot-container">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>

    <ul class="options" v-bind:id="taskId">
      <li><a>Edit</a></li>
      <li><a @click="deleteTaskRequest">Delete</a></li>
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
  margin: 15px -40px 0 40px;
  opacity: 0;
  list-style: none;
  padding: 0.01em;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}
.options li {
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