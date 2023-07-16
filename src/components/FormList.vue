<template>
  <div id="app">
    <h2>Add user</h2>
    <div class="form-box">
      <router-link to='/formlist/add' class="add-button" @click="openModal(null)">+</router-link>
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
              <router-link :to="`/formlist/edit/${index}`" class="edit-button" @click="openModal(index)">Edit</router-link>
              <button class="delete-button" @click="confirmDelete(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <FormModal
      :show="showModal"
      :form="editData"
      :editIndex="editIndex"
      @close="closeModal"
      @save="saveForm"
    />
    <DeleteModal :show="showDeleteModal" @delete="deleteForm" @cancel="cancelDelete" />

    <div class="modal" v-if="showDeleteModal">
      <div class="modal-content">
        <h3>Delete Form</h3>
        <p>Are you sure you want to delete this form?</p>
        <div class="button-row">
          <button class="confirm-button" @click="deleteForm">Yes</button>
          <button class="cancel-button" @click="cancelDelete">No</button>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import FormModal from "../components/FormModal.vue";
import DeleteModal from "../components/DeleteModal.vue";


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
      showDeleteModal: false,
      editIndex: null,
    };
  },
  computed: {
    isAddFormRouteActive() {
      return this.$route.path === "/formlist/add";
    },
  },
  watch: {
    $route(to, from) {
      if (to.name === "AddForm") {
        this.openModal(null);
      } else if (to.name === "EditForm") {
        const index = Number(to.params.index);
        this.openModal(index);
      } else {
        this.closeModal();
      }
    },
  },
  mounted() {
    this.loadFormData();
    this.checkAddRoute(); 

  },
  methods: {
    loadFormData() {
      const formData = localStorage.getItem("formData");
      if (formData) {
        this.formList = JSON.parse(formData);
      }
    },
    saveFormData() {
      localStorage.setItem("formData", JSON.stringify(this.formList));
    },
    openModal(index) {
      this.showModal = true;
      if (index !== null) {
        const form = this.formList[index];
        this.editIndex = index;
        this.editData = { ...form };
      } else {
        this.editIndex = null;
        this.editData = {
          name: "",
          phone: "",
          email: "",
          password: "",
        };
      }
    },
    
    closeModal() {
      this.showModal = false;
      this.editIndex = null;
      this.editData = {
        name: "",
        phone: "",
        email: "",
        password: "",
      };
    },
    saveForm(formData) {
      if (this.editIndex !== null) {
        Object.assign(this.formList[this.editIndex], formData);
      } else {
        this.formList.push({ ...formData });
      }
      this.saveFormData();
      this.closeModal();
    },
 
    confirmDelete(index) {
  this.editIndex = index;
  const deleteUrl = `/formlist/delete/${index}`;
  window.history.pushState({ index }, '', deleteUrl);
  this.showModal = false; // Close the form modal before opening the delete modal
  this.showDeleteModal = true;
},

    deleteForm() {
      this.formList.splice(this.editIndex, 1);
      this.editIndex = null;
      this.saveFormData();
      this.showDeleteModal = false;

    },
    cancelDelete() {
  this.editIndex = null;
  this.showDeleteModal = false;
  window.history.replaceState(null, '', '/formlist');
},

    checkAddRoute() {
    if (this.$route.path === "/formlist/add") {
      this.openModal(null);
    }
  },
  },
  components: {
    FormModal,
    DeleteModal,
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