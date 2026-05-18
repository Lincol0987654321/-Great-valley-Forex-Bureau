/* Greatvalley Forex Bureau - JavaScript */

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS with custom settings
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1200,
      once: true,
      mirror: true,
      offset: 120,
      easing: 'ease-out-cubic'
    });
  }

  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeBtn');

  if (hamburger && mobileMenu && closeBtn) {
    hamburger.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (mobileMenu.classList.contains('active') && 
          !mobileMenu.contains(e.target) && 
          !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          const offsetTop = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Load Exchange Rates from API
  loadExchangeRates();

  // Auto-refresh rates every 5 minutes
  setInterval(loadExchangeRates, 300000);
});

// Function to load exchange rates from CORS-friendly API
async function loadExchangeRates() {
        const ratesContainer = document.getElementById('ratesBody');
        const lastUpdated = document.getElementById('lastUpdated');
        const loadingIndicator = document.getElementById('loadingIndicator');

        if (!ratesContainer || !lastUpdated) return;

        try {
            // Show loading indicator
            if (loadingIndicator) {
                loadingIndicator.style.display = 'inline-block';
            }

            // Use CORS-friendly exchangerate.host API
            // This API supports direct browser requests
            const response = await fetch('https://api.exchangerate.host/latest?base=MWK&symbols=USD,GBP,EUR,ZAR,CAD,AUD,JPY,CHF,SGD');
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.success) {
                throw new Error('API response error');
            }
            
            // Map currency to FlagCDN code
            const flagMap = {
                'USD': 'us',
                'GBP': 'gb',
                'EUR': 'eu',
                'ZAR': 'za',
                'CAD': 'ca',
                'AUD': 'au',
                'JPY': 'jp',
                'CHF': 'ch',
                'SGD': 'sg'
            };
            
            let html = '';
            Object.keys(data.rates).forEach(currency => {
                if (!flagMap[currency]) return;
                const rate = data.rates[currency];
                const buy = Math.round(rate - 20);
                const sell = Math.round(rate + 20);

                html += `
                    <tr>
                        <td>
                            <div class="currency-cell">
                                <img src="https://flagcdn.com/w40/${flagMap[currency]}.png" class="flag">
                                <span>${currency}</span>
                            </div>
                        </td>
                        <td><span class="rate-badge rate-buy">BUY</span> ${buy.toLocaleString()}</td>
                        <td><span class="rate-badge rate-sell">SELL</span> ${sell.toLocaleString()}</td>
                    </tr>
                `;
            });

            ratesContainer.innerHTML = html;

            // Update last updated time
            updateTime(lastUpdated);

        } catch (error) {
            console.warn('Using fallback rates:', error);
            
            // Fallback to hardcoded realistic rates for Malawi context
            const fallback = {
                USD: { buy: 1720, sell: 1760 },
                GBP: { buy: 2320, sell: 2380 },
                EUR: { buy: 2010, sell: 2070 },
                ZAR: { buy: 102, sell: 108 },
                CAD: { buy: 1290, sell: 1330 },
                AUD: { buy: 1170, sell: 1210 },
                JPY: { buy: 12.5, sell: 12.9 },
                CHF: { buy: 1920, sell: 1960 },
                SGD: { buy: 1300, sell: 1340 }
            };
            
            const flagMap = {
                'USD': 'us',
                'GBP': 'gb',
                'EUR': 'eu',
                'ZAR': 'za',
                'CAD': 'ca',
                'AUD': 'au',
                'JPY': 'jp',
                'CHF': 'ch',
                'SGD': 'sg'
            };
            
            let html = '';
            Object.keys(fallback).forEach(cur => {
                const r = fallback[cur];

                html += `
                    <tr>
                        <td>
                            <div class="currency-cell">
                                <img src="https://flagcdn.com/w40/${flagMap[cur]}.png" class="flag">
                                <span>${cur}</span>
                            </div>
                        </td>
                        <td><span class="rate-badge rate-buy">BUY</span> ${r.buy}</td>
                        <td><span class="rate-badge rate-sell">SELL</span> ${r.sell}</td>
                    </tr>
                `;
            });

            ratesContainer.innerHTML = html;
            
            lastUpdated.innerHTML = "* Offline mode (using default rates)";
        } finally {
            // Hide loading indicator
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }
    }

// Update time display
function updateTime(el) {
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const date = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  el.innerHTML = `* Rates are indicative • Last updated: ${time} on ${date}`;
}

// Function to handle form submission
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        alert('Please fill all fields');
        return;
      }
      
      if (!validateEmail(email)) {
        alert('Invalid email');
        return;
      }
      
      alert('Message sent successfully!');
      contactForm.reset();
    });
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Initialize contact form on pages that have it
if (document.getElementById('contactForm')) {
  setupContactForm();
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// Animated counters for stats section
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-target]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute('data-target'));
        const increment = targetValue / 100;
        let count = 0;
        
        const updateCounter = () => {
          count += increment;
          if (count >= targetValue) {
            target.textContent = 
              targetValue === 10 ? '10+' :
              targetValue === 50000 ? '50,000+' :
              targetValue === 24 ? '24/7' :
              targetValue === 100 ? '100%' : targetValue;
            return;
          }
          target.textContent = 
            targetValue === 10 ? Math.floor(count) + '+' :
            targetValue === 50000 ? Math.floor(count).toLocaleString() + '+' :
            targetValue === 24 ? Math.floor(count) + '/7' :
            targetValue === 100 ? Math.floor(count) + '%' : Math.floor(count);
          requestAnimationFrame(updateCounter);
        };
        
        updateCounter();
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.1 });
});
