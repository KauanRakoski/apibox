<template>
  <div>
    <div @click="toogleOptions(task._id)" class="dot-container">
      <i class="fi-sr-menu-dots-vertical"></i>
    </div>

    <ul class="options" v-bind:id="task._id">
      <li @click="editTask"><a><span>✏️</span> Edit</a></li>
      <li @click="deleteTaskRequest"><a><span>🗑️</span> Delete</a></li>
      <li @click="runOnServer(task._id)"><a><span>💻</span> Server</a></li>
      <li @click="qrCode(task._id)"><a><i class="fi-sr-redo"></i> Share</a></li>
    </ul>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import swal from "sweetalert"
import axios from 'axios'

export default {
  name: "TaskOptions",
  data() {
    return {
      serverUrl: `${process.env.VUE_APP_DOMAIN}`,
    };
  },
  props: {
    task: Object,
  },
  methods: {
    toogleOptions(id) {
      let optionsMenu = document.getElementById(id);
      if (optionsMenu.style.opacity != 0) {
          optionsMenu.style.opacity = 0
          optionsMenu.style.visibiblity = 'hidden'
        }
      else{
          optionsMenu.style.opacity = 1
          optionsMenu.style.visibility = 'visible'
      } 
    },
    getUser() {
      let userInfo = localStorage.getItem("AuthUser");
      return JSON.parse(userInfo);
    },
    editTask(){
        this.$router.push({name: 'New', params: {task: this.task}})
    },
    deleteTaskRequest() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                this.$emit("refresh-tasks", this.task._id);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Task deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            })
    },
    async runOnServer(id){
        try{
            let res = await axios.post(`${this.serverUrl}/api/${id}/{i: true}`)

            if(res.data.error) Swal.fire("Something went wrong...", "An error occurred", "error")
            else swal("Task ran", `Response: ${JSON.stringify(res.data)}`, "info")
        }
        catch(e){
            swal("Something went wrong...", "Unable to contact api", "error")
            return e
        }        
        
    },
    qrCode(id){
        this.$emit("showqr", id)
    }
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
  margin: 20px -40px -20px 40px;
  list-style: none;
  padding: 0.01em;
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
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
.options li a i{
    margin-left: 3px;
}
.options li a i, .options li a span{
   margin-right: 10px;
}
</style>