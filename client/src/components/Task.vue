<template>
  <transition name="appear">
    <div class="task">
      <div class="content">
        <button
        type="button"
          @click="copyClipboard"
          :class="'clipboard' + content._id + ' ' + 'btn btn-outline-primary mb-2'"
          :data-clipboard-text="content._id"
          data-toggle="tooltip"
          data-placement="top"
          :title="clipboardText"
        >
          Copy id
        </button>
        <h2 class="task-title">{{ content.name }}</h2>
        <p>{{ content.description }}</p>
      </div>
      <div class="buttons">
        <TaskOptions v-bind:task="content" v-on:refresh-tasks="goUp" />
        <Button
          v-bind:type="content.key"
          v-bind:taskID="content._id"
          v-bind:action="content.action"
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
  data(){
      return{
          clipboardText: 'Click to copy'
      }
  },
  methods: {
    goUp(id) {
      this.$emit("refresh-tasks", id);
    },
    copyClipboard(){
        this.clipboardText = 'Copied!'
    }
  },
  mounted() {
    new ClipboardJS(`.clipboard${this.content._id}`)
  },
};
</script>
<style scoped>
.task {
  background-color: white;
  height: 200px;
  padding: 0 2em;
  border-radius: 3px;
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
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 90px;
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