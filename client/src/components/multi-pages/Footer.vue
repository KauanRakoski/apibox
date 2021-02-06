<template>
  <footer>
    <div>
      <img src="../../assets/controlLogo.svg" width="30px" height="30px" />
    </div>

    <div>
        <p><a href="#">Documentation</a></p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  border-top: 1px solid rgb(178, 178, 178);
  z-index: 3;
  position: absolute;
  bottom: 0;
  
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
}
footer p a{
    color: black;
    text-decoration: none;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 16px;
}
footer p a:hover{
    color: rgb(52, 52, 52);
}
</style>