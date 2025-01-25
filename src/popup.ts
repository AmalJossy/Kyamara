document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  const toggleButton = document.createElement('button');
  toggleButton.textContent = 'Toggle Filter';
  toggleButton.onclick = async () => {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    if (tab.id) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          window.postMessage({ type: MessageType.TOGGLE_FILTER }, '*');
        }
      });
    }
  };
  app?.appendChild(toggleButton);
}); 