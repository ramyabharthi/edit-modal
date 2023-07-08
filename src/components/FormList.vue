<template>
  <div>
    <h2>Add user</h2>
    <div class="form-box">
      <router-link to="/users/add" class="add-button" @click="openModal">+</router-link>

      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(form, index) in formList" :key="index">
            <td class="form-value-cell">{{ form.name }}</td>
            <td class="form-value-cell">{{ form.phone }}</td>
            <td class="form-value-cell">{{ form.email }}</td>
            <td class="form-value-cell">{{ form.password }}</td>
            <td>
              <router-link to="/users/edit" class="edit-button" @click="editForm(index)">Edit</router-link>
              <router-link to="/users/delete" class="delete-button" @click="deleteForm(index)">Delete</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h3>{{ editIndex !== null ? 'Edit Form' : 'Create Form' }}</h3>
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
        <div class="form-field">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="editData.password" />
          <span class="error">{{ errors.password }}</span>
        </div>
        <div class="button-row">
          <button class="save-button" @click="createForm">Save</button>
          <button class="cancel-button" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>

    <div class="modal" v-if="showConfirmation">
      <div class="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this user?</p>
        <div class="button-row">
          <button class="confirm-delete-button" @click="deleteFormConfirmed">Yes</button>
          <button class="cancel-delete-button" @click="cancelDelete">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formList: [],
      editData: {
        name: "",
        phone: "",
        email: "",
        password: "",
      },
      showModal: false,
      showConfirmation: false,
      editIndex: null,
      errors: {
        name: "",
        phone: "",
        email: "",
        password: "",
      },
    };
  },
  mounted() {
  this.loadDataFromLocalStorage();
   if (window.location.pathname.includes('/add')) {
    this.openModal();
  }
},


  methods: {
    loadDataFromLocalStorage() {
      const data = localStorage.getItem("formList");
      if (data) {
        this.formList = JSON.parse(data);
      }
    },
    saveDataToLocalStorage() {
      localStorage.setItem("formList", JSON.stringify(this.formList));
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
      this.$router.push('/users/list');
    },
    resetForm() {
      this.editData = {
        name: "",
        phone: "",
        email: "",
        password: "",
      };
      this.errors = {
        name: "",
        phone: "",
        email: "",
        password: "",
      };
      this.editIndex = null;
    },
    validateForm() {
      let isValid = true;
      this.errors = {
        name: "",
        phone: "",
        email: "",
        password: "",
      };

      if (!this.editData.name) {
        this.errors.name = "Name is required.";
        isValid = false;
      }

      if (!this.editData.phone) {
        this.errors.phone = "Phone number is required.";
        isValid = false;
      }

      if (!this.editData.email) {
        this.errors.email = "Email is required.";
        isValid = false;
      } else if (!this.isValidEmail(this.editData.email)) {
        this.errors.email = "Email is invalid.";
        isValid = false;
      }

      if (!this.editData.password) {
        this.errors.password = "Password is required.";
        isValid = false;
      }

      return isValid;
    },
    isValidEmail(email) {
      // Email validation logic here
      return true;
    },
    createForm() {
      if (this.validateForm()) {
        if (this.editIndex !== null) {
          this.formList.splice(this.editIndex, 1, this.editData);
        } else {
          this.formList.push(this.editData);
        }
        this.saveDataToLocalStorage();
        this.closeModal();
      }
    },
    editForm(index) {
      this.editIndex = index;
      this.editData = { ...this.formList[index] };
      this.showModal = true;
    },
    deleteForm(index) {
      this.showConfirmation = true;
      this.editIndex = index;
    },
    deleteFormConfirmed() {
      this.formList.splice(this.editIndex, 1);
      this.saveDataToLocalStorage();
      this.showConfirmation = false;
    },
    cancelDelete() {
      this.showConfirmation = false;
      this.$router.push('/users/list');

    },
  },
};
</script>
<style>
  #app {
    margin: 20px;
    padding: 20px;
    border-radius: 4px;
  }

  .form-box {
    display: flex;
    align-items: center;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px;
  }

  .add-button {
    font-size: 24px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background-color: #45B2C9;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    position: relative;
    top: -115px;
    right: -100px;
  }

  .table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }

  .table th,
  .table td {
    padding: 8px;
    border-bottom: 1px solid #ccc;
  }

  .table th {
    background-color: #f2f2f2;
  }

  .form-value-cell {
    text-align: center;
  }

  .edit-button {
    font-size: 14px;
    padding: 6px 12px;
    margin-right: 5px;
    border: none;
    border-radius: 5px;
    background-color: #45B2C9;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    right: -97px;
  }

  .delete-button {
    font-size: 14px;
    padding: 6px 12px;
    margin-right: 5px;
    border: none;
    border-radius: 5px;
    background-color: #E6321F;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    right: -97px;
  }

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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    width: 400px;
  }

  .modal-content h3 {
    margin-top: 0;
  }

  .form-field {
    margin-bottom: 10px;
  }

  .form-field label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .form-field input {
    width: 100%;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .error {
    color: #E6321F;
    font-size: 12px;
    margin-top: 5px;
  }

  .button-row {
    margin-top: 10px;
    text-align: right;
  }

  .save-button {
    font-size: 14px;
    padding: 6px 12px;
    margin-left: 5px;
    border: none;
    border-radius: 5px;
    background-color: #45B2C9;
    color: #fff;
    cursor: pointer;
  }

  .cancel-button {
    font-size: 14px;
    padding: 6px 12px;
    margin-left: 5px;
    border: none;
    border-radius: 5px;
    background-color: #E6321F;
    color: #fff;
    cursor: pointer;
  }

  .confirm-delete-button {
    background-color: #45B2C9;
    color: white;
    border: none;
    border-radius: 4px;
  }

  .cancel-delete-button {
    background-color: #E6321F;
    color: white;
    border: none;
    border-radius: 4px;
  }
</style>
