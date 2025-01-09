document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a[data-scroll]").forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(
                anchor.getAttribute("href"),
            );
            if (target) {
                const headerOffset = 80; // Altura del header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        });
    });
});
