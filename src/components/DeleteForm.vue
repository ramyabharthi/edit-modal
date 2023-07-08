<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <h3>Delete Form</h3>
      <p>Are you sure you want to delete this form?</p>
      <div class="button-row">
        <button class="delete-button" @click="deleteForm">Delete</button>
        <button class="cancel-button" @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      editIndex: null
    };
  },
  methods: {
    showDeleteModal(index) {
      this.editIndex = index;
      this.showModal = true;
    },
    deleteForm() {
      // Check if editIndex is valid
      if (this.editIndex !== null && this.editIndex >= 0 && this.editIndex < this.forms.length) {
        // Remove the form at the specified index
        this.forms.splice(this.editIndex, 1);
      }
      this.$router.push('/delete').catch(() => {});

      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
/* DeleteForm component styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
}

.button-row {
  margin-top: 10px;
  text-align: right;
}

button {
  padding: 5px 10px;
  margin-left: 5px;
}

.delete-button {
  background-color: #45B2C9;
  color: white;
  border: none;
}

.cancel-button {
  background-color: #E6321F;
  color: white;
  border: none;
}
</style>
