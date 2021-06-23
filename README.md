<h1 align="center">🕹️ jsint </h1>


 <p align="center">
  <img src="./assets/jsint_mockup.svg"/>
 </p>
 
 <p align="center">
  <b>Keep control and manage tasks using code and buttons</b>
 </p>
 
<p align="center">
  <a href="https://github.com/hipesoft/jsint/issues/new?assignees=&labels=bug&template=bug_report.md&title=Bug+report"><b>Report a bug</b></a>
  &nbsp; &nbsp;
  <a href="https://github.com/hipesoft/jsint/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=Feature+request"><b>Request a feature</b></a>
</p>

<br>

> This app is not yet finished 

### ⚙️ What is jsint and how does it work?

Apibox is a little project built on top of vue and node.js. In it you can create _tasks_, that are tiny pieces of javascript code, and run them in app or on requests from allowed URLs.

In order to be able to use apibox, create an account and a task. Then, if you want to make a request, use a post request to the URL below:

```javascript
 POST "https://apbx.herokuapp.com/api/:task-id"
```

In addition, you can use different types of **triggers**, that is, different ways to activate the action. Right now, there are 2 different triggers: <kbd>click</kbd> and <kbd>switch</kbd>.

### 📚 Libraries and resources

#### Parameters

- inBrowser: `true` if running on browser app, `false` if running on server.
- i: value of the trigger. Is always true if the trigger is not switch.
- params: additional value passed by adding `/:param` in url. Pass just one parameter or a json object.

#### Libraries

- Node libraries (when not running on browser)
- Utilities (apibox shortcut library) comming soon
- SweetAlert

 #### ✔️ Integrating with GitHub Actions
 
 There is a github action available to sync tasks to apibox on your GitHub Workflows. Check [kauanrakoski/sync-apibox](https://github.com/KauanRakoski/sync-apibox)

### 🤝 Contributing

Consider forking and making a pull request, or opening an issue. 😉

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/https://github.com/kauanrakoski/apibox)
