import { messagesTypes } from "./constants";
import { ExtensionMessage } from "./types/messages.type";
import { loopVideoFormHandler } from "./utils/forms";

const postMessageToTab = async (message: ExtensionMessage) => {
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

document.addEventListener("DOMContentLoaded", () => {
  const loopEffectForm = document.getElementById("loop-effect");
  const loopRemoveButton = document.getElementById("remove-effect");
  if (!loopEffectForm || !loopRemoveButton) return;

  loopVideoFormHandler(loopEffectForm as HTMLFormElement, postMessageToTab);

  loopRemoveButton.onclick = () => {
    const message: ExtensionMessage = {
      type: messagesTypes.DISABLE_EFFECT,
    };
    postMessageToTab(message);
  };
});
