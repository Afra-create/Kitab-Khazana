const WHATSAPP_PHONE = "919876543210";
const STORAGE_KEYS = {
  CART: "kk_cart",
  THEME: "kk_theme",
  ENQUIRY_DRAFT: "kk_enquiry_draft"
};
const BOOKS = [
  {
    id: 1,
    title: "The Penguin History of Early India",
    author: "Romila Thapar",
    price: 250,
    category: "History",
    image: "assets/images/book1.webp",
    description: "From the Origins to AD 1300. Authoritative and comprehensive Indian history."
  },
  {
    id: 2,
    title: "A History of Ancient and Early Medieval India",
    author: "Upinder Singh",
    price: 280,
    category: "History",
    image: "assets/images/book2.webp",
    description: "From the Stone Age to the 12th Century. Renowned academic masterwork by Pearson."
  },
  {
    id: 3,
    title: "100 Must-Read Historical Novels",
    author: "Nick Rennison",
    price: 220,
    category: "Fiction",
    image: "assets/images/book3.jpg",
    description: "Bloomsbury Good Reading Guide to the most captivating historical fiction."
  },
  {
    id: 4,
    title: "Train Your Brain",
    author: "Paul Hammerness & Margaret Moore",
    price: 210,
    category: "Self-Help",
    image: "assets/images/book4.jpg",
    description: "6 scientific steps to conquer distraction and get more done in less time."
  },
  {
    id: 5,
    title: "Anxious People",
    author: "Fredrik Backman",
    price: 299,
    category: "Fiction",
    image: "assets/images/book5.webp",
    description: "A witty, deeply poignant story of an apartment viewing gone absurdly wrong."
  }
];
function renderBooks(booksList) {
  const grid = document.getElementById("bookGrid");
  if (!grid) return;

  grid.innerHTML = booksList.map(book => `
    <article class="book-card reveal-on-scroll" data-category="${book.category}">
      <div class="book-img-wrap">
        <img src="${book.image}" alt="${book.title}" class="book-img" loading="lazy">
        <span class="badge">${book.category}</span>
      </div>
      <div class="book-info">
        <h3>${book.title}</h3>
        <p class="author">${book.author}</p>
        <p class="book-desc">${book.description}</p>
        <div class="book-price-row">
          <span class="price">₹${book.price}</span>
          <button class="add-cart-btn" onclick="addToCart(${book.id})" aria-label="Add ${book.title} to selection">
            <i class="bi bi-cart-plus"></i> Add
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function getCart() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEYS.CART);
    return rawData ? JSON.parse(rawData) : [];
  } catch (err) {
    console.warn("Could not read cart from localStorage:", err);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  } catch (err) {
    console.warn("Could not save cart to localStorage:", err);
  }
  updateCartUI();
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.qty, 0);
}

window.addToCart = function (bookId) {
  const cart = getCart();
  const existing = cart.find(item => item.id === bookId);

  if (existing) {
    existing.qty += 1;
  } else {
    const book = BOOKS.find(b => b.id === bookId);
    if (!book) return;
    cart.push({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
      qty: 1
    });
  }

  saveCart(cart);
  const targetBook = BOOKS.find(b => b.id === bookId);
  showToast(`Added "${targetBook.title}" to selection!`, "success");
};

window.removeFromCart = function (bookId) {
  const cart = getCart();
  const updated = cart.filter(item => item.id !== bookId);
  saveCart(updated);
  showToast("Item removed from selection.", "success");
};

window.updateQuantity = function (bookId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === bookId);

  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      window.removeFromCart(bookId);
      return;
    }
  }
  saveCart(cart);
};

window.clearCart = function () {
  saveCart([]);
  showToast("Selection cleared.", "success");
};

function updateCartUI() {
  const cart = getCart();
  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalCount;
  }
  const cartItemsContainer = document.getElementById("cartItems");
  const cartEmptyMsg = document.getElementById("cartEmpty");
  const cartFooter = document.getElementById("cartFooter");
  const cartTotalEl = document.getElementById("cartTotal");
  if (!cartItemsContainer) return;
  if (cart.length === 0) {
    if (cartEmptyMsg) cartEmptyMsg.style.display = "block";
    if (cartFooter) cartFooter.style.display = "none";
    cartItemsContainer.querySelectorAll(".cart-item").forEach(el => el.remove());
    if (cartTotalEl) cartTotalEl.textContent = "₹0";
    return;
  }
  if (cartEmptyMsg) cartEmptyMsg.style.display = "none";
  if (cartFooter) cartFooter.style.display = "block";
  cartItemsContainer.querySelectorAll(".cart-item").forEach(el => el.remove());

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item-img">
      <div class="cart-item-info">
        <h4>${item.title}</h4>
        <p class="cart-item-author">${item.author}</p>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)" aria-label="Decrease quantity">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button>
          <span class="cart-item-price">₹${item.price * item.qty}</span>
          <button class="remove-btn" onclick="removeFromCart(${item.id})" aria-label="Remove item" title="Remove">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(row);
  });

  if (cartTotalEl) {
    cartTotalEl.textContent = `₹${getCartTotal()}`;
  }
}

window.openCart = function () {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");
  if (sidebar && overlay) {
    sidebar.classList.add("cart-open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

window.closeCart = function () {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");
  if (sidebar && overlay) {
    sidebar.classList.remove("cart-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
};

window.showToast = function (message, type = "success") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="bi bi-${type === "success" ? "check-circle-fill" : "exclamation-triangle-fill"}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add("toast-show"), 10);
  setTimeout(() => {
    toast.classList.remove("toast-show");
    setTimeout(() => toast.remove(), 350);
  }, 3200);
};

window.showModal = function (htmlContent) {
  const modal = document.getElementById("orderModal");
  const modalBody = document.getElementById("modalBody");
  if (modal && modalBody) {
    modalBody.innerHTML = htmlContent;
    modal.classList.add("active");
    modal.classList.remove("d-none");
    document.body.style.overflow = "hidden";
  }
};

window.closeModal = function () {
  const modal = document.getElementById("orderModal");
  if (modal) {
    modal.classList.remove("active");
    modal.classList.add("d-none");
    document.body.style.overflow = "";
  }
};

window.checkoutWhatsApp = function () {
  const cart = getCart();
  if (cart.length === 0) {
    showToast("Your selection is empty. Add books first!", "error");
    return;
  }

  const orderRef = "KK-" + Math.floor(100000 + Math.random() * 900000);

  let message = `📚 KITABKHAZANA Order / Reservation Enquiry\n`;
  message += `───────────────────────\n`;
  message += `Reference ID: ${orderRef}\n`;
  message += `Items Selected:\n`;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.title}\n   Qty: ${item.qty} × ₹${item.price} = ₹${item.qty * item.price}\n`;
  });

  message += `───────────────────────\n`;
  message += `Estimated Total: ₹${getCartTotal()}\n\n`;
  message += `Please confirm availability and dispatch options. Thank you!`;

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");

  showModal(`
    <div style="text-align: center; padding: 10px 0;">
      <i class="bi bi-whatsapp text-success" style="font-size: 3.5rem;"></i>
      <h3 class="fw-bold mt-3">Enquiry Ready!</h3>
      <p class="text-muted">Reference Number: <strong class="text-dark">${orderRef}</strong></p>
      <p class="small text-muted mb-4">WhatsApp has been opened with your book summary. Hit <strong>Send</strong> in WhatsApp to finalize your enquiry with our client service team.</p>
      <button class="btn btn-dark rounded-pill px-4 py-2" onclick="closeModal()">Close</button>
    </div>
  `);

  window.closeCart();
};

function setupEnquiryForm() {
  const form = document.getElementById("enquiryForm");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const bookSelect = document.getElementById("bookSelect");
  const messageInput = document.getElementById("message");
  const charCount = document.getElementById("charCount");

  try {
    const savedDraft = localStorage.getItem(STORAGE_KEYS.ENQUIRY_DRAFT);
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      if (draft.name && nameInput) nameInput.value = draft.name;
      if (draft.email && emailInput) emailInput.value = draft.email;
      if (draft.phone && phoneInput) phoneInput.value = draft.phone;
    }
  } catch (e) {
    console.warn("Could not load enquiry draft:", e);
  }

  const persistDraft = () => {
    try {
      const draft = {
        name: nameInput ? nameInput.value.trim() : "",
        email: emailInput ? emailInput.value.trim() : "",
        phone: phoneInput ? phoneInput.value.trim() : ""
      };
      localStorage.setItem(STORAGE_KEYS.ENQUIRY_DRAFT, JSON.stringify(draft));
    } catch (e) {
      console.warn("Could not persist draft:", e);
    }
  };

  [nameInput, emailInput, phoneInput].forEach(input => {
    if (input) input.addEventListener("input", persistDraft);
  });

  if (messageInput && charCount) {
    messageInput.addEventListener("input", () => {
      charCount.textContent = messageInput.value.length;
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const bookTitle = bookSelect && bookSelect.selectedIndex > 0 ? bookSelect.options[bookSelect.selectedIndex].text : "";
    const message = messageInput ? messageInput.value.trim() : "";

    const selectedConditionEl = form.querySelector('input[name="bookCondition"]:checked');
    const condition = selectedConditionEl ? selectedConditionEl.value : "Standard";

    if (name.length < 3) {
      showToast("Please enter a valid full name (minimum 3 characters).", "error");
      nameInput.focus();
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast("Please enter a valid email address.", "error");
      emailInput.focus();
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      showToast("Please enter a valid 10-digit mobile number.", "error");
      phoneInput.focus();
      return;
    }

    if (!bookSelect.value) {
      showToast("Please select a book or enquiry category.", "error");
      bookSelect.focus();
      return;
    }

    const enquiryId = "ENQ-" + Math.floor(100000 + Math.random() * 900000);

    // Build WhtsAppmsg
    let waText = `📚 KITABKHAZANA Service Enquiry\n`;
    waText += `───────────────────────\n`;
    waText += `Enquiry ID: ${enquiryId}\n`;
    waText += `Item / Service: ${bookTitle}\n`;
    waText += `Preferred Condition: ${condition}\n`;
    waText += `Name: ${name}\n`;
    waText += `Email: ${email}\n`;
    waText += `Phone: ${phone}\n`;
    if (message) {
      waText += `Message: ${message}\n`;
    }
    waText += `───────────────────────\n`;
    waText += `Please confirm availability and next steps. Thank you!`;

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`, "_blank");

    showModal(`
      <div style="text-align: center; padding: 10px 0;">
        <i class="bi bi-check-circle-fill text-success" style="font-size: 3.5rem;"></i>
        <h3 class="fw-bold mt-3">Enquiry Submitted!</h3>
        <p class="text-muted">Enquiry Reference: <strong class="text-dark">${enquiryId}</strong></p>
        <p class="small text-muted mb-3">Item: <strong>${bookTitle}</strong> (${condition})</p>
        <p class="small text-muted mb-4">A pre-formatted WhatsApp message has been generated. Press <strong>Send</strong> in WhatsApp to dispatch your enquiry directly to our team.</p>
        <button class="btn btn-dark rounded-pill px-4 py-2" onclick="closeModal()">Done</button>
      </div>
    `);

    form.reset();
    localStorage.removeItem(STORAGE_KEYS.ENQUIRY_DRAFT);
    if (charCount) charCount.textContent = "0";
  });
}

function initScrollObserver() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (elements.length === 0) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add("visible"));
  }
}

function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "light";

  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";

      if (newTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderBooks(BOOKS);
  updateCartUI();
  setupEnquiryForm();

  initThemeToggle();
  initScrollObserver();

  document.getElementById("cartBtn")?.addEventListener("click", window.openCart);
  document.getElementById("cartClose")?.addEventListener("click", window.closeCart);
  document.getElementById("cartOverlay")?.addEventListener("click", window.closeCart);
  document.getElementById("checkoutBtn")?.addEventListener("click", window.checkoutWhatsApp);
  document.getElementById("clearCartBtn")?.addEventListener("click", window.clearCart);
  document.getElementById("modalClose")?.addEventListener("click", window.closeModal);
  document.getElementById("closeCartAndBrowse")?.addEventListener("click", window.closeCart);

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isActive = mobileMenu.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isActive ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  const currentYearEl = document.getElementById("currentYear");
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});
