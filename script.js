// script.js

// Ghi chú: Dòng này đảm bảo code được thực thi sau khi toàn bộ tài liệu HTML được tải xong
document.addEventListener("DOMContentLoaded", () => {
    /* -------------------------
    // 1. Menu Navigation (Chuyển động mượt mà khi nhấp vào mục menu)
    ------------------------- */
    const menuLinks = document.querySelectorAll("header .menu a");
    menuLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault(); // Ngăn chặn chuyển hướng mặc định
            const targetId = link.getAttribute("href").substring(1); // Lấy ID của mục tiêu
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",    // Cuộn mượt mà
                    block: "start"         // Căn chỉnh đầu phần cần hiển thị
                });
            }
        });
    });

    console.log("Menu navigation setup complete.");

    /* -------------------------
    // 2. Add to Cart Button (Nút thêm vào giỏ hàng)
    ------------------------- */
    const addToCartButtons = document.querySelectorAll(".product .btn");
    const cart = []; // Giả lập giỏ hàng (thực tế nên sử dụng storage hoặc gửi về backend)
    
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productName = button.parentElement.querySelector("h3").textContent;
            const productPrice = button.parentElement.querySelector("p").textContent;

            cart.push({ name: productName, price: productPrice });
            alert(`${productName} đã được thêm vào giỏ hàng!`);
            console.log(cart); // Ghi giỏ hàng hiện tại ra console (dành cho kiểm tra)
        });
    });

    console.log("Add to cart button listeners initialized.");

    /* -------------------------
    // 3. Contact Form Submission (Xử lý form liên hệ)
    ------------------------- */
    const contactForm = document.querySelector("#contact form");
    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault(); // Ngăn form gửi dữ liệu lên server (thực tế cần backend xử lý)

            const name = contactForm.querySelector("input[type='text']").value;
            const email = contactForm.querySelector("input[type='email']").value;
            const message = contactForm.querySelector("textarea").value;

            // Validator cơ bản
            if (name === "" || email === "" || message === "") {
                alert("Vui lòng điền đầy đủ thông tin!");
            } else {
                alert("Thông tin đã được gửi. Cảm ơn bạn!");
                contactForm.reset(); // Reset form sau khi gửi
            }

            console.log({
                name: name,
                email: email,
                message: message
            });
        });

        console.log("Contact form listener attached.");
    }

    /* -------------------------
    // 4. Dynamic Year for Footer (Cập nhật năm hiện tại trong footer)
    ------------------------- */
    const currentYear = new Date().getFullYear();
    const footerCopyright = document.querySelector("footer p");
    if (footerCopyright) {
        footerCopyright.innerHTML = `&copy; ${currentYear} Sports Store. All rights reserved.`;
    }

    console.log("Footer year dynamically updated.");
});