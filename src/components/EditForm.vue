<template>
  <div>
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h3>Edit Form</h3>
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
    if (this.$route.path === '/edit') {
      this.showModal = true;
    }
  },
  watch: {
    $route(to) {
      if (to.path === '/edit') {
        this.showModal = true;
      } else {
        this.showModal = false;
      }
    },
  },
  methods: {
    saveForm() {
      // Validate form data
      if (!this.validateForm()) {
        return;
      }

      // Perform save logic here
      // ...

      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
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
/* EditForm component styles */
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
