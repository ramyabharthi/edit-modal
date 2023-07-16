<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <h3>{{ editIndex !== null ? "Edit Form" : "Create Form" }}</h3>
      <div class="form-field">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" />
        <span class="error">{{ errors.name }}</span>
      </div>
      <div class="form-field">
        <label for="phone">Phone Number:</label>
        <input type="text" id="phone" v-model="form.phone" />
        <span class="error">{{ errors.phone }}</span>
      </div>
      <div class="form-field">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="form.email" />
        <span class="error">{{ errors.email }}</span>
      </div>
      <div class="form-field">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" />
        <span class="error">{{ errors.password }}</span>
      </div>
      <div class="button-row">
        <button class="save-button" @click="saveForm">Save</button>
        <button class="cancel-button" @click="cancelForm">Cancel</button>
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
    form: {
      type: Object,
      required: true,
    },
    editIndex: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      errors: {
        name: "",
        phone: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    saveForm() {
      if (this.validateForm()) {
        this.$emit("save", this.form);
      }
    },
    cancelForm() {
      this.$router.push({ name: "FormList" });
      this.$emit("close");
    },
    validateForm() {
      this.clearErrors();
      let isValid = true;

      if (!this.form.name) {
        this.errors.name = "Name is required.";
        isValid = false;
      }
      if (!this.form.phone) {
        this.errors.phone = "Phone number is required.";
        isValid = false;
      } else if (this.form.phone.length !== 10 || !/^\d+$/.test(this.form.phone)) {
        this.errors.phone = "Phone number must be a 10-digit number.";
        isValid = false;
      }
      if (!this.form.email) {
        this.errors.email = "Email is required.";
        isValid = false;
      }
      if (!this.form.password) {
        this.errors.password = "Password is required.";
        isValid = false;
      }

      return isValid;
    },
    clearErrors() {
      this.errors = {
        name: "",
        phone: "",
        email: "",
        password: "",
      };
    },
  },
};
</script>

<style>
/* Your styles */
</style>
