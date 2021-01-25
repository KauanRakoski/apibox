<template>
  <div class="master">
    <Header />
    <div class="content">
      <h3>✨ Add a new task</h3>

      <form :action="postRoute + getUserId() + '/'" method="POST">
        <div class="input-group">
          <label for="name">Name of the task:</label>
          <input name="name" id="name" placeholder="i.e Great Sausage" />
        </div>

        <div class="input-group">
          <label for="description">Description:</label>
          <input name="description" id="description" placeholder="i.e Starts cooking a sausage" />
        </div>

        <div class="input-group">
          <label for="key">Select a key:</label>
          <select name="key" id="key">
            <option value="slider">Slider V</option>
            <option value="click">Click</option>
          </select>
        </div>

        <div class="input-group">
          <label for="code">Action:</label>
          <textarea name="code" id="code">function(i){your code goes here...}</textarea>
        </div>

        <button v-on:submit.prevent="saveNote" class="btn btn-primary">
          Create new task
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "New",
  components: {
    Header,
  },
  data() {
    return {
      postRoute:
        "https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/add/",
    };
  },
  methods: {
    getUserId() {
      let userInfo = localStorage.getItem("AuthUser");
      let jsonInfo = JSON.parse(userInfo);
      return jsonInfo.uid
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h3 {
  text-align: center;
  font-family: "Inter", sans-serif;
  margin: 2em 0;
  font-size: 23px;
}
form {
  padding: 1.5em;
  border-radius: 8px;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3), -2px -2px 3px rgba(0, 0, 0, 0.136);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input-group {
  margin-bottom: 20px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.input-group label {
  font-family: "Inter", sans-serif;
  font-size: 15px;
  padding: 0.5em;
}
.input-group input {
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
  /* box-shadow: 2px 2px 6px rgba(0,0,0,.6); */

  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
}
select option {
  font-family: "Inter", sans-serif;
  border-radius: 40px;
  font-size: 15px;
  font-weight: 300;
  border-radius: 88px;
}
</style>

