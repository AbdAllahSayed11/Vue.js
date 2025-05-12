<template>
  <div class="sidebar">
    <div class="card">
      <div class="card-header  text-white">
        <h5 class="mb-0" style="color: black;">INFO</h5>
      </div>
      <div class="list-group list-group-flush">
        <a href="#" class="list-group-item list-group-item-action active">
          <i class="bi bi-house-door me-2"></i> Dashboard
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <i class="bi bi-people me-2"></i> Students
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <i class="bi bi-mortarboard me-2"></i> Classes
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <i class="bi bi-calendar3 me-2"></i> Schedule
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <i class="bi bi-graph-up me-2"></i> Reports
        </a>

      </div>
    </div>
    
  <br><br>
        <div class="d-flex justify-content-between mb-3">
          <span>Total Students:</span>
          <span class="badge bg-primary rounded-pill">{{ totalStudents }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Active Classes:</span>
          <span class="badge bg-success rounded-pill">5</span>
        </div>
      </div>
 
</template>

<script>
export default {
  name: "SidebarComponent",
  data() {
    return {
      totalStudents: 0
    }
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:3001/students");
      const students = await response.json();
      this.totalStudents = students.length;
    } catch (err) {
      console.error("Error fetching student count:", err);
    }
  }
}
</script>

<style scoped>
.sidebar {
  height: 100%;
}

.list-group-item {
  transition: all 0.3s ease;
  border-left: 0;
  border-right: 0;
}

.list-group-item:hover {
  background-color: #f8f9fa;
  transform: translateX(5px);
}

.list-group-item.active {
  background-color: #f5b300;
  border-color: #fbd878;
}

.card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(116, 17, 17, 0.1);
}
</style>
