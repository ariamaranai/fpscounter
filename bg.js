chrome.action.onClicked.addListener(async tab => {
  if (tab.url[0] == "c")
    tab = await chrome.tabs.update({ url: "about:blank" });
  let tabId = tab.id;
  let target = { tabId };
  (await chrome.debugger.getTargets()).find(v => v.tabId == tabId).attached
    ? chrome.debugger.detach(target)
    : (
      chrome.debugger.attach(target, "1.3"),
      chrome.debugger.sendCommand(target, "DOM.enable"),
      chrome.debugger.sendCommand(target, "Overlay.enable"),
      chrome.debugger.sendCommand(target, "Overlay.setShowFPSCounter", { show: !0 })
    );
});