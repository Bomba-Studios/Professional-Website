document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a[data-scroll]").forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(
                anchor.getAttribute("href"),
            );
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});