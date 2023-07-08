<template>
    <div class="error-page">
      <p class="error-message">Sorry, the page you are looking does not exist!</p>
    </div>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style scoped>
  .error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: cursive;
    background-color: #f9f9f9;
    position: relative;
    top:-250px;
  }
  
  .error-message {
    font-size: 24px;
    background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
}


  </style>
  