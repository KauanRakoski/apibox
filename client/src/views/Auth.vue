<template>
  <div class="master">
    <div class="hello">
      <img id="jsint-cube" src="../assets/jsint-cube-blue.svg" width="60px" height="60px">
      <h1>Sign In To Jsint</h1>
      <img src="../assets/login.jpg" width="500px" height="500px" />
    </div>

    <div class="buttons">
        <h3>Continue with:</h3>
        <p>Don't worry. We won't share any of your data.</p>
      <div id="loginButtons"></div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "Auth",
  mounted() {
    var uiConfig = {
      signInSuccessUrl: "/dashboard",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        /* firebase.auth.FacebookAuthProvider.PROVIDER_ID */
      ],
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#loginButtons", uiConfig);
  },
};
</script>

<style scoped>
.master {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 100px;
  align-items: center;
  justify-content: space-around;
}
#jsint-cube{
  display: none;
}
h1 {
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
}
h3{
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 600;  
  width: 200px;
  text-align: center;
}
p{
    width: 200px;
    text-align: center;
    color: rgb(105, 105, 105);
}
.buttons {
    border-top: 7px solid #4460F1;
  padding: 3em 0.5em;
  height: 300px;
  display: flex;
  flex-direction: column;
 justify-content: space-around;
 align-items: center;
 border-radius: 8px;
 box-shadow: 2px 2px 4px rgba(0,0,0,.3)
}
@media only screen and (max-width: 790px){
  .master{
    flex-direction: column;
  }
  #jsint-cube{
  display: block;
}
.hello{
  height: 120px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  align-items: center;
  justify-content: space-around;
}
  img{
    display: none;
  }
}
</style>
