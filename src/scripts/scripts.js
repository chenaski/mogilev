class VisionSettings {
    static COLOR_THEMES = {
        BLACK_WHITE: "BLACK_WHITE",
        WHITE_BLACK: "WHITE_BLACK",
        DARKBLUE_BLUE: "DARKBLUE_BLUE",
        BROWN_BEIGE: "BROWN_BEIGE",
    };
    static COLOR_THEMES_CLASSES = {
        [VisionSettings.COLOR_THEMES.BLACK_WHITE]: "black-white",
        [VisionSettings.COLOR_THEMES.WHITE_BLACK]: "white-black",
        [VisionSettings.COLOR_THEMES.DARKBLUE_BLUE]: "darkblue-blue",
        [VisionSettings.COLOR_THEMES.BROWN_BEIGE]: "brown-beige",
    };
    static NO_IMAGES_CLASS = "no-images";
    static COLOR_THEME_ENABLED_CLASS = "color-theme-enabled";

    static INITIAL_COLOR_THEME = null;

    static INITIAL_FONT_SIZE = 16;
    static MIN_FONT_SIZE = 12;
    static MAX_FONT_SIZE = 20;

    static INITIAL_LINE_HEIGHT = 1.5;
    static MIN_LINE_HEIGHT = 1.2;
    static MAX_LINE_HEIGHT = 2.2;

    static INITIAL_IS_IMAGES_ENABLED = true;

    fontSize = VisionSettings.INITIAL_FONT_SIZE;
    lineHeight = VisionSettings.INITIAL_LINE_HEIGHT;
    colorTheme = VisionSettings.INITIAL_COLOR_THEME;
    isImagesEnabled = VisionSettings.INITIAL_IS_IMAGES_ENABLED;

    static LOCAL_STORE_KEY = "vision-settings";

    constructor() {
        const storeSettings = localStorage.getItem(VisionSettings.LOCAL_STORE_KEY);

        try {
            const settings = JSON.parse(storeSettings);

            settings.fontSize && this.setFontSize(settings.fontSize);
            settings.lineHeight && this.setLineHeight(settings.lineHeight);
            settings.colorTheme && this.setColorTheme(settings.colorTheme);
            settings.isImagesEnabled !== undefined && this.setIsImagesInabled(settings.isImagesEnabled);
        } catch (e) {}
    }

    updateStorage() {
        const storeSettings = {
            fontSize: this.fontSize,
            lineHeight: this.lineHeight,
            colorTheme: this.colorTheme,
            isImagesEnabled: this.isImagesEnabled,
        };

        localStorage.setItem(VisionSettings.LOCAL_STORE_KEY, JSON.stringify(storeSettings));
    }

    clearAll() {
        localStorage.removeItem(VisionSettings.LOCAL_STORE_KEY);

        this.setFontSize(VisionSettings.INITIAL_FONT_SIZE);
        this.setLineHeight(VisionSettings.INITIAL_LINE_HEIGHT);
        this.setColorTheme(VisionSettings.INITIAL_COLOR_THEME);
        this.setIsImagesInabled(VisionSettings.INITIAL_IS_IMAGES_ENABLED);

        document.documentElement.classList.remove(VisionSettings.COLOR_THEME_ENABLED_CLASS);
    }

    setFontSize(size) {
        if (size < VisionSettings.MIN_FONT_SIZE || size > VisionSettings.MAX_FONT_SIZE) return;
        this.fontSize = size;
        document.documentElement.style.fontSize = `${size}px`;
        this.updateStorage();
    }

    increaseFontSize() {
        this.setFontSize(this.fontSize + 1);
    }

    decreaseFontSize() {
        this.setFontSize(this.fontSize - 1);
    }

    setLineHeight(lineHeight) {
        if (lineHeight < VisionSettings.MIN_LINE_HEIGHT || lineHeight > VisionSettings.MAX_LINE_HEIGHT) return;
        this.lineHeight = lineHeight;
        document.documentElement.style.lineHeight = `${lineHeight}`;
        document.documentElement.style.setProperty(
            "--extra-line-height",
            lineHeight - VisionSettings.INITIAL_LINE_HEIGHT
        );
        this.updateStorage();
    }

    increaseLineHeight() {
        this.setLineHeight(this.lineHeight + 0.1);
    }

    decreaseLineHeight() {
        this.setLineHeight(this.lineHeight - 0.1);
    }

    setIsImagesInabled(isEnabled) {
        this.isImagesEnabled = isEnabled;
        document.documentElement.classList.toggle(VisionSettings.NO_IMAGES_CLASS, !isEnabled);
        this.updateStorage();
    }

    enableImages() {
        this.setIsImagesInabled(true);
    }

    disableImages() {
        this.setIsImagesInabled(false);
    }

    setColorTheme(colorTheme) {
        document.documentElement.classList.add(VisionSettings.COLOR_THEME_ENABLED_CLASS);
        document.documentElement.classList.remove(VisionSettings.COLOR_THEMES_CLASSES[this.colorTheme]);
        this.colorTheme = colorTheme;
        document.documentElement.classList.add(VisionSettings.COLOR_THEMES_CLASSES[this.colorTheme]);
        this.updateStorage();
    }
}

function main() {
    const settings = new VisionSettings();

    const visionButton = document.querySelector(".vision-button");
    const visionPanel = document.querySelector(".vision-panel");

    visionButton.addEventListener("click", () => {
        visionPanel.style.display = visionPanel.style.display !== "flex" ? "flex" : "none";
    });

    const increaseFontButton = document.querySelector(".increase-font-button");
    const decreseFontButton = document.querySelector(".descrease-font-button");

    increaseFontButton.addEventListener("click", () => {
        settings.increaseFontSize();
    });

    decreseFontButton.addEventListener("click", () => {
        settings.decreaseFontSize();
    });

    const blackWhiteButton = document.querySelector(".black-white-button");
    const whiteBlackButton = document.querySelector(".white-black-button");
    const darkblueBlueButton = document.querySelector(".darkblue-blue-button");
    const brownBeigeButton = document.querySelector(".brown-beige-button");

    blackWhiteButton.addEventListener("click", () => {
        settings.setColorTheme(VisionSettings.COLOR_THEMES.BLACK_WHITE);
    });

    whiteBlackButton.addEventListener("click", () => {
        settings.setColorTheme(VisionSettings.COLOR_THEMES.WHITE_BLACK);
    });

    darkblueBlueButton.addEventListener("click", () => {
        settings.setColorTheme(VisionSettings.COLOR_THEMES.DARKBLUE_BLUE);
    });

    brownBeigeButton.addEventListener("click", () => {
        settings.setColorTheme(VisionSettings.COLOR_THEMES.BROWN_BEIGE);
    });

    const enableImagesButton = document.querySelector(".enable-images-button");
    const disableImagesButton = document.querySelector(".disable-images-button");

    enableImagesButton.addEventListener("click", () => {
        settings.enableImages();
    });

    disableImagesButton.addEventListener("click", () => {
        settings.disableImages();
    });

    const increaseLineHeightButton = document.querySelector(".increase-line-height-button");
    const decreaseLineHeightButton = document.querySelector(".decrease-line-height-button");

    increaseLineHeightButton.addEventListener("click", () => {
        settings.increaseLineHeight();
    });

    decreaseLineHeightButton.addEventListener("click", () => {
        settings.decreaseLineHeight();
    });

    const clearVisionSettingsButton = document.querySelector(".clear-vision-settings-button");

    clearVisionSettingsButton.addEventListener("click", () => {
        settings.clearAll();
    });
}

document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", main) : main();
