'use strict';

document.addEventListener("DOMContentLoaded", () => {

  // Toggle active class on element
  const elementToggleFunc = function (elem) {
    if (elem) elem.classList.toggle("active");
  }

  // Sidebar toggle
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
  }

  // Testimonial Modal Handling
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const testimonialsModalFunc = function () {
    elementToggleFunc(modalContainer);
    elementToggleFunc(overlay);
  }

  testimonialsItem.forEach(item => {
    item.addEventListener("click", () => {
      const avatar = item.querySelector("[data-testimonials-avatar]");
      const title = item.querySelector("[data-testimonials-title]");
      const text = item.querySelector("[data-testimonials-text]");

      modalImg.src = avatar?.src || "";
      modalImg.alt = avatar?.alt || "";
      modalTitle.innerHTML = title?.innerHTML || "";
      modalText.innerHTML = text?.innerHTML || "";

      testimonialsModalFunc();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

  // Custom Select and Filter
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  if (select) {
    select.addEventListener("click", () => elementToggleFunc(select));
  }

  const filterFunc = function (selectedValue) {
    filterItems.forEach(item => {
      if (selectedValue === "all" || selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  selectItems.forEach(item => {
    item.addEventListener("click", () => {
      const value = item.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = item.innerText;
      elementToggleFunc(select);
      filterFunc(value);
    });
  });

  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      const value = btn.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = btn.innerText;
      filterFunc(value);
      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      btn.classList.add("active");
      lastClickedBtn = btn;
    });
  });

  // Contact Form Validation
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      if (form?.checkValidity()) {
        formBtn?.removeAttribute("disabled");
      } else {
        formBtn?.setAttribute("disabled", "");
      }
    });
  });

  // Navigation Logic
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navigationLinks.forEach((link, index) => {
    link.addEventListener("click", () => {
      const pageName = link.innerText.toLowerCase().trim();
      pages.forEach((page, i) => {
        if (page.dataset.page === pageName) {
          page.classList.add("active");
          navigationLinks[i].classList.add("active");
        } else {
          page.classList.remove("active");
          navigationLinks[i].classList.remove("active");
        }
      });
      window.scrollTo(0, 0);
    });
  });

});
