const app = document.getElementById("app");
const loader = document.getElementById("loader");

const pages = {

home: `
<div class="page">

<section class="hero">

<h1>Next Generation SPA</h1>

<p>
Experience seamless navigation, dynamic rendering,
smooth transitions, and modern web interactions
without page reloads.
</p>

</section>

<div class="stats">

<div class="stat-box">
<h2>100%</h2>
<p>Responsive Design</p>
</div>

<div class="stat-box">
<h2>4+</h2>
<p>Dynamic Pages</p>
</div>

<div class="stat-box">
<h2>0</h2>
<p>Page Reloads</p>
</div>

</div>

<div class="cards">

<div class="card">
<h3>⚡ Fast Navigation</h3>
<p>
Navigate between pages instantly using JavaScript
routing and History API.
</p>
</div>

<div class="card">
<h3>🎨 Interactive UI</h3>
<p>
Beautiful gradients, animations and modern design
principles improve user experience.
</p>
</div>

<div class="card">
<h3>📱 Fully Responsive</h3>
<p>
Optimized for desktop, tablet and mobile devices.
</p>
</div>

</div>

</div>
`,

about: `
<div class="page">

<section class="hero">

<h1>About This Project</h1>

<p>
This project demonstrates a modern Single Page
Application architecture using only HTML, CSS and
JavaScript.
</p>

</section>

<div class="cards">

<div class="card">
<h3>🚀 Client Side Routing</h3>
<p>
Uses the Browser History API to update URLs without
refreshing the page.
</p>
</div>

<div class="card">
<h3>🔄 Dynamic Rendering</h3>
<p>
Content updates dynamically inside a single HTML
document.
</p>
</div>

<div class="card">
<h3>💡 Better Performance</h3>
<p>
Avoids unnecessary page reloads and creates a
smoother user experience.
</p>
</div>

</div>

</div>
`,

services: `
<div class="page">

<section class="hero">

<h1>Our Services</h1>

<p>
A demonstration of service cards with interactive
layouts and hover effects.
</p>

</section>

<div class="cards">

<div class="card">
<h3>🌐 Web Development</h3>
<p>
Building responsive and modern websites using
latest technologies.
</p>
</div>

<div class="card">
<h3>🎯 UI/UX Design</h3>
<p>
Designing engaging and user-friendly interfaces.
</p>
</div>

<div class="card">
<h3>⚙ Front-End Engineering</h3>
<p>
Creating highly interactive and scalable web
applications.
</p>
</div>

<div class="card">
<h3>📊 Performance Optimization</h3>
<p>
Improving speed, accessibility and responsiveness.
</p>
</div>

<div class="card">
<h3>☁ Cloud Integration</h3>
<p>
Connecting applications with cloud services and APIs.
</p>
</div>

<div class="card">
<h3>🔐 Security Practices</h3>
<p>
Implementing secure and reliable web solutions.
</p>
</div>

</div>

</div>
`,

contact: `
<div class="page">

<section class="hero">

<h1>Contact Us</h1>

<p>
Feel free to send us your feedback or project inquiry.
</p>

</section>

<form class="contact-form" id="contactForm">

<input
type="text"
placeholder="Enter Your Name"
required
>

<input
type="email"
placeholder="Enter Your Email"
required
>

<textarea
rows="6"
placeholder="Write Your Message"
required
></textarea>

<button type="submit">
Send Message
</button>

</form>

</div>
`
};

function showLoader() {

loader.style.transform = "scaleX(1)";

setTimeout(() => {
loader.style.transform = "scaleX(0)";
}, 500);

}

function render(page) {

showLoader();

setTimeout(() => {

app.innerHTML = pages[page] || `

<div class="page">

<section class="hero">

<h1>404</h1>

<p>
Oops! The page you are looking for does not exist.
</p>

</section>

</div>

`;

const form = document.getElementById("contactForm");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

const button = form.querySelector("button");

button.innerText = "Message Sent ✓";

button.style.background = "#2ed573";

setTimeout(() => {

button.innerText = "Send Message";
button.style.background = "";

form.reset();

},2000);

});

}

},300);

}

document.addEventListener("click",(e)=>{

if(e.target.matches("[data-route]")){

e.preventDefault();

const page = e.target.dataset.route;

history.pushState(
{ page },
"",
e.target.getAttribute("href")
);

render(page);

}

});

window.addEventListener("popstate",(e)=>{

render(e.state?.page || "home");

});

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

themeBtn.textContent = "☀️";

localStorage.setItem("theme","dark");

}
else{

themeBtn.textContent = "🌙";

localStorage.setItem("theme","light");

}

});

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){

document.body.classList.add("dark");

themeBtn.textContent = "☀️";

}

render("home");