chrome.action.onClicked.addListener(tab => {
  let tabId = tab.id;
  let target = { tabId };
  chrome.debugger.getTargets(result =>
    result.find(v => v.tabId == tabId).attached
      ? chrome.debugger.detach(target)
      : chrome.debugger.attach(target, "1.3").then(() => (
          chrome.debugger.sendCommand(target, "DOM.enable"),
          chrome.debugger.sendCommand(target, "Overlay.enable"),
          chrome.debugger.sendCommand(target, "Overlay.setShowFPSCounter", { show: !0 })
        )).catch(() => 0)
  );
});