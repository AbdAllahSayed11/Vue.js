<template>
  <header class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <h1 class="logo">Student Dashbord</h1>
      </div>
      <nav class="navbar-links">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Students</a></li>
          <li><a href="#">Reports</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "NavbarComponent"
}
</script>

<style scoped>
.navbar {
  background-color: #757272; 
  color: #ccc; 
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand .logo {
  font-size: 1.8rem;
  color: #f5b300; 
  font-weight: 600;
}

.navbar-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.navbar-links li {
  margin: 0 20px;
}

.navbar-links a {
  text-decoration: none;
  color: #ccc;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.navbar-links a:hover {
  color: #f5b300;
}

@media (max-width: 768px) {
  .navbar-links {
    display: none;
  }

  .navbar-links.active {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #222;
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
    padding: 20px 0;
  }

  .navbar-links li {
    margin: 10px 0;
  }

  .navbar-toggle {
    display: block;
    color: #fff;
    font-size: 1.5rem;
  }
}
</style>
