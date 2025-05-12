<template>
  <div class="container py-4">
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-dark" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2 text-muted">Loading student data...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <div v-else>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0 text-dark">Student Records</h4>
        <div class="d-flex">
          <input
            type="text"
            class="form-control me-2"
            placeholder="Search students..."
            v-model="searchQuery"
            @input="performSearch"
          />
          <button
            class="btn btn-outline-dark"
            @click="clearSearch"
            v-if="searchQuery"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th class="text-center">ID</th>
              <th>Name</th>
              <th>City</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredStudents.length === 0">
              <td colspan="4" class="text-center py-4">
                <div class="alert alert-info mb-0">
                  <i class="bi bi-exclamation-circle me-2"></i>
                  No students found. Try a different search or add a new student.
                </div>
              </td>
            </tr>
            <tr v-for="student in paginatedStudents" :key="student.id">
              <td class="text-center">{{ student.id }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.city }}</td>
              <td class="text-center">
                <button
                  class="btn btn-outline-info btn-sm"
                  title="Edit"
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  title="Delete"
                  @click="confirmDelete(student)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-flex justify-content-between align-items-center mt-3">
        <p class="text-muted mb-0">
          Showing {{ paginatedStudents.length }} of {{ filteredStudents.length }} students
          <span v-if="searchQuery"> (filtered from {{ students.length }} total)</span>
        </p>
        <nav aria-label="Page navigation" v-if="totalPages > 1">
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
            </li>
            <li
              v-for="page in displayedPages"
              :key="page"
              class="page-item"
              :class="{ active: page === currentPage }"
            >
              <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    students: [],
    loading: true,
    error: false,
    errorMessage: '',
    searchQuery: '',
    currentPage: 1,
    pageSize: 5,
    studentToDelete: null,
    isDeleting: false,
    sortField: null,
    sortDirection: 'asc'
  }),
  computed: {
    filteredStudents() {
      if (!this.searchQuery) return this.sortedStudents;
      const query = this.searchQuery.toLowerCase().trim();
      return this.sortedStudents.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.city.toLowerCase().includes(query) ||
        String(student.id).includes(query)
      );
    },
    sortedStudents() {
      if (!this.sortField) return this.students;
      return [...this.students].sort((a, b) => {
        let fieldA = a[this.sortField].toLowerCase();
        let fieldB = b[this.sortField].toLowerCase();
        if (this.sortDirection === 'asc') {
          return fieldA > fieldB ? 1 : -1;
        } else {
          return fieldA < fieldB ? 1 : -1;
        }
      });
    },
    totalPages() {
      return Math.ceil(this.filteredStudents.length / this.pageSize);
    },
    paginatedStudents() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredStudents.slice(start, end);
    },
    displayedPages() {
      const pages = [];
      const totalPages = this.totalPages;
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      }
      return pages;
    }
  },
  methods: {
    performSearch() {
      this.currentPage = 1;
    },
    clearSearch() {
      this.searchQuery = '';
      this.currentPage = 1;
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    confirmDelete(student) {
      this.studentToDelete = student;
      const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
      modal.show();
    },
    async deleteStudent() {
      if (!this.studentToDelete) return;
      this.isDeleting = true;
      try {
        const response = await fetch(`http://localhost:3001/students/${this.studentToDelete.id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        this.students = this.students.filter(s => s.id !== this.studentToDelete.id);
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
        modal.hide();
        this.studentToDelete = null;
        if (this.paginatedStudents.length === 0 && this.currentPage > 1) {
          this.currentPage--;
        }
      } catch (err) {
        console.error("Error deleting student:", err);
        alert("Failed to delete student. Please try again.");
      } finally {
        this.isDeleting = false;
      }
    }
  },
  async mounted() {
    try {
      this.loading = true;
      let response = await fetch("http://localhost:3001/students");
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      this.students = await response.json();
      this.loading = false;
    } catch (err) {
      this.error = true;
      this.errorMessage = "Failed to fetch students data. Please make sure the API server is running.";
      console.error("Error fetching students:", err);
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.table th {
  font-weight: 500;
  color: #333;
}

.table td {
  font-size: 0.95rem;
}

.table-striped tbody tr:nth-child(odd) {
  background-color: #f8f9fa;
}

.table-bordered th, .table-bordered td {
  border: 1px solid #dee2e6;
}

.pagination .page-link {
  color: #495057;
  border-color: #dee2e6;
}

.pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
}

.pagination .page-link:hover {
  background-color: #e9ecef;
}

.btn-outline-dark {
  color: #007bff;
  border-color: #007bff;
}

.btn-outline-dark:hover {
  background-color: #7b8895;
  color: #fff;
}

.text-muted {
  font-size: 0.9rem;
}

.card-body {
  background-color: #ffffff;
}
</style>
