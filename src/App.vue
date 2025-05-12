<template>
  <div class="container-fluid">
    <div class="row">
      <Header />
    </div>
    <div class="row mt-4">
      <div class="col-md-3">
        <Side />
      </div>
      <div class="col-md-9">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h2>Student Management </h2>
          </div>
          <div class="card-body">
            <Model />
            <hr class="my-4">
            <Table />
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Side from "./components/side.vue";
import Footer from "./components/footer.vue";
import Table from "./components/table.vue";
import Model from "./components/model.vue";

export default {
  name: "App",
  components: {
    Header,
    Side,
    Footer,
    Table,
    Model
  },
};
</script>

<style>
body {
  background-color: #f5f5f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}

.card {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.card-header {
  font-weight: 600;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th {
  background-color: #f8f9fa;
  padding: 12px 15px;
  font-weight: 600;
}

table td {
  padding: 10px 15px;
  border-bottom: 1px solid #e9ecef;
}

table tr:hover {
  background-color: #f2f8ff;
}

button.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
  transition: all 0.3s ease;
}

button.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}
</style>
