<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<style>
*{
    margin: 0;
    box-sizing: border-box;
}
.btn{
    padding: 0.7em 2em;
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    font-weight: bold;
}
.btn-primary{
    color: white;
    background-color: #5469D4;
}
.btn-secondary{
    color: #5469D4;
    background-color: #E5EFFD;
}
.btn-secondary:hover{
    background-color:  rgb(193, 209, 233);
}
</style>
