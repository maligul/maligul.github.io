document.addEventListener("mousemove", (e) => {
    const cursor = document.querySelector(".custom-cursor");
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  
  const toggle = document.querySelector(".toggle");
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
  });
  
