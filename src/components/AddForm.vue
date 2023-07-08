<template>
  <div>
    <div class="add-form-link">
      <router-link to="/add" class="add-link">Add Form</router-link>
    </div>
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h3>Add Form</h3>
        <div class="form-field">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="editData.name" />
          <span class="error">{{ errors.name }}</span>
        </div>
        <div class="form-field">
          <label for="phone">Phone Number:</label>
          <input type="text" id="phone" v-model="editData.phone" />
          <span class="error">{{ errors.phone }}</span>
        </div>
        <div class="form-field">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="editData.email" />
          <span class="error">{{ errors.email }}</span>
        </div>
        <div class="button-row">
          <button class="save-button" @click="saveForm">Save</button>
          <button class="cancel-button" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      editIndex: null,
      editData: {
        name: "",
        phone: "",
        email: "",
      },
      errors: {
        name: "",
        phone: "",
        email: "",
      },
    };
  },
  created() {
    // Check if the modal state is stored in localStorage
    const modalState = localStorage.getItem('modalState');
    if (modalState) {
      this.showModal = JSON.parse(modalState);
    }
  },
  methods: {
    showFormModal(index = null) {
      if (index !== null) {
        // Edit mode, populate form with existing data
        this.editIndex = index;
        this.editData = { ...this.forms[index] };
      } else {
        // Create mode, reset form data
        this.editIndex = null;
        this.editData = {
          name: "",
          phone: "",
          email: "",
        };
      }
      // Show the modal and store the state in localStorage
      this.showModal = true;
      localStorage.setItem('modalState', JSON.stringify(this.showModal));
    },
    saveForm() {
      // Validate form data
      if (!this.validateForm()) {
        return;
      }

      // Perform save logic here
      if (this.editIndex !== null) {
        // Edit existing form
        this.forms[this.editIndex] = { ...this.editData };
      } else {
        // Add new form
        this.forms.push({ ...this.editData });
      }

      // Redirect to the desired route
      this.$router.push('/add').catch(() => {});

      this.closeModal();
    },
    closeModal() {
      // Hide the modal and remove the state from localStorage
      this.showModal = false;
      localStorage.removeItem('modalState');
      this.resetForm();
    },
    resetForm() {
      this.editIndex = null;
      this.editData = {
        name: "",
        phone: "",
        email: "",
      };
      this.errors = {
        name: "",
        phone: "",
        email: "",
      };
    },
    validateForm() {
      let isValid = true;

      if (this.editData.name.trim() === "") {
        this.errors.name = "Name is required";
        isValid = false;
      } else {
        this.errors.name = "";
      }

      if (this.editData.phone.trim() === "") {
        this.errors.phone = "Phone number is required";
        isValid = false;
      } else {
        this.errors.phone = "";
      }

      if (this.editData.email.trim() === "") {
        this.errors.email = "Email is required";
        isValid = false;
      } else {
        this.errors.email = "";
      }

      return isValid;
    },
  },
};
</script>

<style scoped>
/* AddForm component styles */
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

.form-field {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"] {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.button-row {
  margin-top: 10px;
  text-align: right;
}

button {
  padding: 5px 10px;
  margin-left: 5px;
}

.save-button {
  background-color: #5cb85c;
  color: #fff;
  border: none;
}

.cancel-button {
  background-color: #d9534f;
  color: #fff;
  border: none;
}
</style>
