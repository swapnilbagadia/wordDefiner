// Create a context menu item that appears when text is selected
chrome.contextMenus.create({
 id: "defineWord",
 title: "Define selected word",
 contexts: ["selection"]
});

// Listen for clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
 if (info.menuItemId === "defineWord") {
 const selectedText = info.selectionText.trim();
 if (selectedText) {
 // Use a free dictionary API (e.g., Free Dictionary API)
 const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`;
 
 fetch(apiUrl)
 .then(response => response.json())
 .then(data => {
 // Extract the first definition (adjust based on API response structure)
 const definition = data[0]?.meanings[0]?.definitions[0]?.definition || "Definition not found.";
 // Send the definition to the content script
 chrome.tabs.sendMessage(tab.id, {
 action: "showDefinition",
 selectedText: selectedText,
 definition: definition
 });
 })
 .catch(error => {
 console.error("Error fetching definition:", error);
 chrome.tabs.sendMessage(tab.id, {
 action: "showDefinition",
 selectedText: selectedText,
 definition: "Definition not found."
 });
 });
 }
 }
});