<template>
    <div class="modal" v-if="show">
      <div class="modal-content">
        <h3>Delete Form</h3>
        <p>Are you sure you want to delete this form?</p>
        <div class="button-row">
          <button class="confirm-button" @click="deleteForm">Yes</button>
          <button class="cancel-button" @click="cancelDelete">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      deleteForm() {
        this.$emit("delete");
      },
      cancelDelete() {
        
        this.$emit("cancel");
      },
    },
  };
  </script>
  
  <style>
  /* Your styles */
  </style>
  