<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h5 class="footer-title">Student Management</h5>
          <p class="footer-description">
            A great system to manage student records and information efficiently and securely as dashbord .
          </p>
        </div>
        <div class="col-md-6">
          <h5 class="footer-title">Quick Links</h5>
          <ul class="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Students</a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="text-muted">© 2025 Abdallah Sayed . All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style scoped>
.footer {
  background-color: #595959; 
  color: #ccc; 
  padding: 40px 0;
}

.footer-title {
  font-size: 1.5rem;
  color: #f5b300; 
  margin-bottom: 15px;
  font-weight: 600;
}

.footer-description {
  font-size: 1rem;
  color: #aaa; 
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  text-decoration: none;
  color: #ccc;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #f5b300; 
}

.footer-bottom {
  text-align: center;
  margin-top: 30px;
}

.footer-bottom p {
  font-size: 0.9rem;
  color: #aaa;
}

@media (max-width: 768px) {
  .footer-title {
    font-size: 1.25rem;
  }

  .footer-description {
    font-size: 0.9rem;
  }

  .footer-links a {
    font-size: 0.9rem;
  }
}
</style>
