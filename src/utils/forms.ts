import { effectNames, messagesTypes } from "../constants";
import { ExtensionMessage } from "../types/messages.type";

export const loopVideoFormHandler = (
  formElement: HTMLFormElement,
  callback: (message: ExtensionMessage) => void
) => {
  formElement.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    const durationVal = formData.get("duration");
    const message: ExtensionMessage = {
      type: messagesTypes.ENABLE_EFFECT,
      payload: {
        effectName: effectNames.LOOP_VIDEO,
        options: durationVal
          ? {
              duration: +durationVal,
            }
          : undefined,
      },
    };
    callback(message);
  };
};
