<template>
  <div>
    <h1>Login:</h1>
    <div id="loginButtons"></div>
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
      ],
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#loginButtons", uiConfig);
  },
};
</script>