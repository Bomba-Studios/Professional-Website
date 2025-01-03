const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        header?.classList.remove("absolute", "bg-transparent");
        header?.classList.add(
            "fixed",
            "bg-white/60",
            "backdrop-blur-lg",
            "shadow-sm",
        );
    } else {
        header?.classList.remove(
            "fixed",
            "bg-white/60",
            "backdrop-blur-lg",
            "shadow-sm",
        );
        header?.classList.add("absolute", "bg-transparent");
    }
});