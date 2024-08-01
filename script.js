document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.getElementById("language-selector");
    const elementsToTranslate = document.querySelectorAll("[data-lang]");
    let translations = {};

    // Load translations
    fetch("translations.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Translations loaded:", data); // Added for debugging
            translations = data;
            updateTextContent(languageSelector.value);
        })
        .catch(error => console.error("Error loading translations:", error));

    // Change language
    languageSelector.addEventListener("change", (event) => {
        console.log(`Language changed to: ${event.target.value}`); // Added for debugging
        updateTextContent(event.target.value);
    });

    function updateTextContent(language) {
        console.log(`Updating text content for language: ${language}`); // Added for debugging
        const currentTranslations = translations[language] || translations["ar"];
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute("data-lang");
            if (currentTranslations[key]) {
                element.textContent = currentTranslations[key];
                if (element.placeholder) {
                    element.placeholder = currentTranslations[key];
                }
            } else {
                console.warn(`Translation key "${key}" not found for language "${language}"`);
            }
        });
    }
});
