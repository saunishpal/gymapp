const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const fitnessForm = document.getElementById("fitnessForm");
const formMessage = document.getElementById("formMessage");
const loader = document.getElementById("loader");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const chatToggle = document.getElementById("chat-toggle");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");
const quickButtons = document.querySelectorAll(".quick-btn");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden-loader");
  }, 1200);
  revealOnScroll();
});

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

fitnessForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formMessage.textContent = "Your inquiry has been submitted successfully.";
  fitnessForm.reset();

  setTimeout(() => {
    formMessage.textContent = "";
  }, 3000);
});

function revealOnScroll() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

function updateActiveNav() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

function toggleScrollTopButton() {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
}

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

window.addEventListener("scroll", () => {
  revealOnScroll();
  updateActiveNav();
  toggleScrollTopButton();
});

chatToggle.addEventListener("click", () => {
  chatbot.classList.toggle("hidden");
});

closeChat.addEventListener("click", () => {
  chatbot.classList.add("hidden");
});

function addMessage(message, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
  msgDiv.textContent = message;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes("plan") || msg.includes("pricing") || msg.includes("membership")) {
    return "We offer Basic, Pro, and Elite membership plans depending on your training goals and support needs.";
  }

  if (msg.includes("weight loss") || msg.includes("fat loss")) {
    return "Our Weight Loss Program includes structured workouts, guidance, and habit support to help you reduce fat effectively.";
  }

  if (msg.includes("online") || msg.includes("remote")) {
    return "Yes, we offer online coaching with custom workout plans, habit tracking, and regular guidance.";
  }

  if (msg.includes("timing") || msg.includes("time") || msg.includes("open")) {
    return "We are available Monday to Saturday from 6:00 AM to 9:00 PM.";
  }

  if (msg.includes("join") || msg.includes("start") || msg.includes("contact")) {
    return "You can get started by filling out the inquiry form in the contact section. We will help you choose the right plan.";
  }

  if (msg.includes("diet") || msg.includes("meal") || msg.includes("nutrition")) {
    return "Yes, we provide nutrition guidance and meal recommendations based on your selected plan.";
  }

  if (msg.includes("muscle") || msg.includes("muscle gain")) {
    return "Our Muscle Building Program focuses on hypertrophy training, progressive overload, and recovery guidance.";
  }

  if (msg.includes("hello") || msg.includes("hi")) {
    return "Hello! Welcome to Iron Pulse Fitness. How can I help you with your fitness goals today?";
  }

  if (msg.includes("thanks") || msg.includes("thank you")) {
    return "You're welcome. Stay strong and keep moving forward.";
  }

  return "I can help with plans, weight loss, online coaching, timings, diet guidance, or how to join.";
}

function handleUserMessage(customMessage = null) {
  const message = customMessage || userInput.value.trim();

  if (!message) return;

  addMessage(message, "user");

  setTimeout(() => {
    const reply = getBotReply(message);
    addMessage(reply, "bot");
  }, 500);

  userInput.value = "";
}

sendBtn.addEventListener("click", () => handleUserMessage());

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleUserMessage();
  }
});

quickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleUserMessage(button.textContent);
  });
});