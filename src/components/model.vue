<template>
  <div>
    <button type="button" class="btn btn-warning  mb-4" data-bs-toggle="modal" data-bs-target="#studentModal">
      <i class="bi bi-plus-circle me-2"></i>Add Student
    </button>

    <div class="modal fade" id="studentModal" tabindex="-1" aria-labelledby="studentModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content rounded-3 shadow-lg">
          <div class="modal-header  text-white">
            <h5 class="modal-title" id="studentModalLabel">Add New Student</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">Student Name</label>
                <input 
                  type="text" 
                  class="form-control"
                  id="name" 
                  v-model="name"
                  placeholder="Enter full name"
                  :class="{'is-invalid': nameError}"
                >
                <div v-if="nameError" class="invalid-feedback">
                  Please enter a valid name
                </div>
              </div>
              <div class="mb-3">
                <label for="city" class="form-label">City</label>
                <input 
                  class="form-control" 
                  id="city" 
                  v-model="city"
                  placeholder="Enter city"
                  :class="{'is-invalid': cityError}"
                />
                <div v-if="cityError" class="invalid-feedback">
                  Please enter a valid city
                </div>
              </div>
            </form>
            <div v-if="submitError" class="alert alert-danger mt-3">
              {{ errorMessage }}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              <i class="bi bi-x-circle me-1"></i>Cancel
            </button>
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="addStudent"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-1" role="status"></span>
              <i v-else class="bi bi-check-circle me-1"></i>Save Student
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: '',
    city: '',
    nameError: false,
    cityError: false,
    submitError: false,
    errorMessage: '',
    isSubmitting: false
  }),
  methods: {
    validateForm() {
      this.nameError = !this.name.trim();
      this.cityError = !this.city.trim();
      return !this.nameError && !this.cityError;
    },
    async addStudent() {
      if (!this.validateForm()) return;
      
      this.isSubmitting = true;
      this.submitError = false;
      
      const data = {
        name: this.name.trim(),
        city: this.city.trim()
      };
      
      try {
        const response = await fetch("http://localhost:3001/students", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {"Content-Type": "application/json"}
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        // Reset form
        this.name = '';
        this.city = '';
        this.nameError = false;
        this.cityError = false;
        
        // Close modal
        document.querySelector('[data-bs-dismiss="modal"]').click();
        
        // Trigger event to refresh student list
        this.$emit('student-added');
        
        // Show success alert
        this.showAlert('Student added successfully!', 'success');
      } catch (err) {
        console.error("Error adding student:", err);
        this.submitError = true;
        this.errorMessage = "Failed to add student. Please make sure the API server is running.";
      } finally {
        this.isSubmitting = false;
      }
    },
    showAlert(message, type = 'info') {
      // You would implement this as needed
      // Could be a custom toast or use third-party library
      alert(message);
    }
  }
};
</script>

<style scoped>
/* Modal Styles */
.modal-content {
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.modal-header {
  background-color: #79808b;
  border-bottom: none;
}

.modal-header .modal-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.modal-footer {
  border-top: none;
  display: flex;
  justify-content: space-between;
}

.form-label {
  font-weight: 600;
  color: #333;
}

.form-control {
  border-radius: 0.5rem;
  transition: border 0.3s ease;
}

.form-control:focus {
  border-color: #f3f038c3;
  box-shadow: 0 0 0 0.2rem f3f038c3(13, 110, 253, 0.25);
}

.btn-custom {
  background-color: #f3f038c3;
  border: none;
  color: white;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn-custom:hover {
  background-color: #f3f038c3;
}

.btn-primary {
  background-color: #f3f038c3;
  border-color: #f3f038c3;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn-primary:disabled {
  background-color: #cccccc;
  border-color: #cccccc;
}

.invalid-feedback {
  font-size: 0.875rem;
  color: #dc3545;
}

.spinner-border {
  width: 1.25rem;
  height: 1.25rem;
  border-width: 0.2em;
}

.alert {
  font-size: 0.875rem;
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

@media (max-width: 768px) {
  .modal-dialog {
    max-width: 100%;
  }
}
</style>
