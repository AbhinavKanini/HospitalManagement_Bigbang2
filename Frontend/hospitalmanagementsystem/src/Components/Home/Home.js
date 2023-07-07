import React from 'react';
import './Home.css'

function Home() {
  return (
    <div>
      <header>
        <h1>Hospital Services</h1>
      </header>

      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      <main>
        <section className="services">
          <h2>Our Services</h2>
          <div className="service">
            <h3>General Medicine</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper ante non dignissim ultrices.</p>
          </div>
          <div className="service">
            <h3>Pediatrics</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper ante non dignissim ultrices.</p>
          </div>
          <div className="service">
            <h3>Surgery</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper ante non dignissim ultrices.</p>
          </div>
          {/* Add more services here */}
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Your Hospital. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
