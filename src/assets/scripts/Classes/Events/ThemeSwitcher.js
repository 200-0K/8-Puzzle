const switchIconDuration = 300; // Switch icon duration in ms

export default class ThemeSwitcher {
    constructor() {
        // Common HTML element properties
        this.element = document.createElement("span");
        this.element.classList.add("iconify");
        this.element.dataset.inline = false;
        
        this.event();
    }

    event() {
        document.querySelector(".theme-switch").addEventListener("click", this.toggle.bind(this));
    }   

    toggle() {
        const iconContainer = document.querySelector(".theme-switch");
        const oldIcon = document.querySelector(".theme-switch .iconify");
        const newIcon = (document.documentElement.classList.contains("dark")) ? this.getLightThemeIcon() : this.getDarkThemeIcon();

        // Pause wave animation
        iconContainer.style["animation-play-state"] = "paused";
        // Start switch transition
        iconContainer.classList.add("switching");
        setTimeout(() => {
            // Replace the icon while it's hidden
            oldIcon.replaceWith(newIcon);
            // Remove dark class if it's there, or add it if it's not
            document.documentElement.classList.toggle("dark");

            iconContainer.classList.remove("switching");
            // Play wave animation again
            iconContainer.style["animation-play-state"] = "";
        }, switchIconDuration);
    }

    getLightThemeIcon() {
        const icon = this.element.cloneNode();
        icon.setAttribute("data-icon", "bx-bxs-sun");
        icon.classList.add("sun");
        return icon;
    }

    getDarkThemeIcon() {
        const icon = this.element.cloneNode();
        icon.setAttribute("data-icon", "bx-bxs-moon");
        icon.classList.add("moon");
        return icon;
    }
}