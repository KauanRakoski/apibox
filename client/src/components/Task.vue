<template>
  <transition name="appear">
    <div class="task">
      <div class="content">
        <button
        type="button"
          @click="copyClipboard"
          :class="'clipboard' + content._id + ' ' + 'button-copy'"
          :data-clipboard-text="content._id">
            <ion-icon name="clipboard-outline"></ion-icon>
            <span class="clipboard-text">Copy id</span>
        </button>
        <h2 class="task-title">{{ content.name }}</h2>
        <p>{{ content.description }}</p>
      </div>
      <div class="buttons">
        <TaskOptions v-bind:task="content" v-on:refresh-tasks="goUp" v-on:showqr="sendQr"/>
        <Button
          v-bind:type="content.key"
          v-bind:taskID="content._id"
          v-bind:action="content.action"
          @click="copyClipboard()"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import Button from "./Button";
import TaskOptions from "./TaskOptions";
import ClipboardJS from "clipboard";
export default {
  name: "Task",
  components: {
    Button,
    TaskOptions,
  },
  
  props: {
    content: Object,
  },
  methods: {
    goUp(id) {
      this.$emit("refresh-tasks", id);
    },
    sendQr(id){
        this.$emit('showqr', id)
    },
    copyClipboard(){
        var btn = document.querySelector(`.clipboard${this.content._id}`)
        btn.childNodes[1].innerHTML = "Copied!"

        setTimeout(() => {
            btn.childNodes[1].innerHTML = "Copy id"
        }, 2000)
    }
  },
  mounted() {
    new ClipboardJS(`.clipboard${this.content._id}`)
  },
};
</script>
<style scoped>
.task {
  background-color: #FFFFFF;
  height: 200px;
  padding: 0 2em;
  border-radius: 4px;
  box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.3), -3px -3px 14px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.task .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.button-copy{
    background-color: #FAFAFA;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    width: 150px;
    max-height: 50px;
    padding: 0.5em 2em;
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    cursor: pointer;
    outline: none;
}
.button-copy:hover{
    background-color: rgba(236, 236, 236, 0.957);
}

.clipboard-text{
    transition: all 200ms;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 15px;
}
.task .content h2 {
  font-family: "Inter", sans-serif;
  color: black;
  margin-bottom: 15px;
  font-weight: 500;
}
.task .content p {
  font-family: "Inter", sans-serif;
  font-size: 20px;
}
.buttons {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 170px;
}
.appear-enter-active,
.appear-leave-active {
  transition: all 0.5s;
}
.appear-enter,
.appear-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
@media only screen and (max-width: 520px) {
  .task .content h2 {
    font-size: 19px;
  }
  .task .content p {
    font-size: 15px;
  }
}
</style>