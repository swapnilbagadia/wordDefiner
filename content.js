chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
 if (message.action === "showDefinition") {
 showPopup(message.selectedText, message.definition);
 }
});

function showPopup(selectedText, definition) {
 // Remove any existing popup
 let existingPopup = document.getElementById("word-definer-popup");
 if (existingPopup) existingPopup.remove();

 // Create a new popup div
 const popup = document.createElement("div");
 popup.id = "word-definer-popup";
 popup.innerHTML = `<h3>${selectedText}</h3><p>${definition}</p>`;

 // Style the popup
 popup.style.position = "absolute";
 popup.style.backgroundColor = "white";
 popup.style.border = "1px solid black";
 popup.style.padding = "10px";
 popup.style.zIndex = "1000";
 popup.style.maxWidth = "300px";
 popup.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

 // Get the position of the current selection
 const selection = window.getSelection();
 let top, left;
 if (selection.rangeCount > 0) {
 const range = selection.getRangeAt(0);
 const rect = range.getBoundingClientRect();
 top = rect.bottom + window.scrollY;
 left = rect.left + window.scrollX;
 } else {
 // Fallback position if selection is lost
 top = window.scrollY + 100;
 left = window.scrollX + 100;
 }

 popup.style.top = `${top}px`;
 popup.style.left = `${left}px`;

 // Add the popup to the page
 document.body.appendChild(popup);

 // Remove the popup when clicking outside
 document.addEventListener("click", function removePopup(event) {
 if (!popup.contains(event.target)) {
 popup.remove();
 document.removeEventListener("click", removePopup);
 }
 });
}