<template>
  <div id="app">
    <h2>{{ getTitle() }}</h2>
    <div class="form-box">
      <button class="add-button" @click="openModal(null)">+</button>
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
            <td>{{ form.name }}</td>
            <td>{{ form.phone }}</td>
            <td>{{ form.email }}</td>
            <td>{{ form.password }}</td>
            <td>
              <button class="edit-button" @click="openModal(index)">Edit</button>
              <button class="delete-button" @click="showDeleteModal(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h3>{{ getModalTitle() }}</h3>
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
    <div class="modal" v-if="showDeleteConfirmation">
      <div class="modal-content">
        <h3>Delete Confirmation</h3>
        <p>Are you sure you want to delete this form?</p>
        <div class="button-row">
          <button class="confirm-delete-button" @click="deleteForm(deleteIndex)">Delete</button>
          <button class="cancel-button" @click="closeDeleteModal">Cancel</button>
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
        name: '',
        phone: '',
        email: '',
        password: '',
      },
      showModal: false,
      editIndex: null,
      errors: {
        name: '',
        phone: '',
        email: '',
        password: '',
      },
      showDeleteConfirmation: false,
      deleteIndex: null,
      currentRoute: '', 
    };
  },
  created() {
    const storedFormList = localStorage.getItem('formList');
    if (storedFormList) {
      this.formList = JSON.parse(storedFormList);
    }
    this.currentRoute = this.$route.name; 

    if (this.currentRoute === 'AddForm') {
      this.openModal(null);
    }
  },
  computed: {
    currentAction() {
      return this.currentRoute; 
    },
  },
  methods: {
    getTitle() {
      switch (this.currentAction) {
        case 'FormList':
          return 'Form List';
        case 'AddForm':
          return 'Add Form';
        case 'EditForm':
          return 'Edit Form';
        case 'DeleteForm':
          return 'Delete Form';
        default:
          return 'Page Not Found';
      }
    },
    getModalTitle() {
      switch (this.currentAction) {
        case 'AddForm':
          return 'Create Form';
        case 'EditForm':
          return 'Edit Form';
        default:
          return '';
      }
    },
    openModal(index) {
  this.showModal = true;
  if (index !== null) {
    const form = this.formList[index];
    this.editIndex = index;
    this.editData = { ...form };
    this.currentRoute = 'EditForm';
    this.$router.push({ name: 'EditForm', params: { id: index } });
  } else {
    this.editIndex = null;
    this.editData = {
      name: '',
      phone: '',
      email: '',
      password: '',
    };
    this.currentRoute = 'AddForm';
    this.$router.push({ name: 'AddForm' }); 
  }
  this.clearErrors();
},

    closeModal() {
      this.showModal = false;
      this.editIndex = null;
      this.editData = {
        name: '',
        phone: '',
        email: '',
        password: '',
      };
      this.clearErrors();

      if (this.currentRoute === 'AddForm') {
        this.currentRoute = 'FormList'; 
        this.$router.push({ name: 'FormList' });
      }
    },
    createForm() {
      if (this.validateForm()) {
        if (this.editIndex !== null) {
          Object.assign(this.formList[this.editIndex], this.editData);
        } else {
          this.formList.push({ ...this.editData });
        }

        this.closeModal(); 
      }
    },
    showDeleteModal(index) {
      this.showDeleteConfirmation = true;
      this.deleteIndex = index;

      if (this.currentAction !== 'DeleteForm') {
        this.$router.push({ name: 'DeleteForm', params: { id: index } });
      }
    },
    closeDeleteModal() {
      this.showDeleteConfirmation = false;
      this.deleteIndex = null;

      if (this.currentAction === 'DeleteForm') {
        this.$router.push({ name: 'FormList' });
      }
    },
    deleteForm(index) {
      this.formList.splice(index, 1);

      this.closeDeleteModal();
    },
    validateForm() {
      this.clearErrors();
      let isValid = true;

      if (!this.editData.name) {
        this.errors.name = 'Name is required.';
        isValid = false;
      }
      if (!this.editData.phone) {
        this.errors.phone = 'Phone number is required.';
        isValid = false;
      } else if (this.editData.phone.length !== 10 || !/^\d+$/.test(this.editData.phone)) {
        this.errors.phone = 'Phone number must be a 10-digit number.';
        isValid = false;
      }
      if (!this.editData.email) {
        this.errors.email = 'Email is required.';
        isValid = false;
      }
      if (!this.editData.password) {
        this.errors.password = 'Password is required.';
        isValid = false;
      }

      return isValid;
    },
    clearErrors() {
      this.errors = {
        name: '',
        phone: '',
        email: '',
        password: '',
      };
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
  
  .edit-button{
    font-size: 14px;
    padding: 6px 12px;
    margin-right: 5px;
    border: none;
    border-radius: 5px;
    background-color: #45B2C9;
    color: #fff;
    cursor: pointer;
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
  
  .save-button{
    font-size: 14px;
    padding: 6px 12px;
    margin-left: 5px;
    border: none;
    border-radius: 5px;

    background-color: #45B2C9;
    color: #fff;
    cursor: pointer;
  }
  
  .confirm-delete-button{
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
</style>