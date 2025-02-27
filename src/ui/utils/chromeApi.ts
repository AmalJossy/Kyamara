import { ExtensionMessage } from "../../types/messages.type";

export const postMessageToTab = async (message: ExtensionMessage) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (tab.id) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (arg) => {
        console.log("sending message", arg);
        window.postMessage(arg, "*");
      },
      args: [message],
    });
  }
};
