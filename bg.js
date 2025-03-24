chrome.action.onClicked.addListener(async tab => {
  let tabId = (tab.url[0] != "c" ? tab : await chrome.tabs.update({ url: "about:blank" })).id;
  let target = { tabId };
  chrome.debugger.getTargets(result =>
    result.find(v => v.tabId == tabId).attached
    ? chrome.debugger.detach(target)
    : (
      chrome.debugger.attach(target, "1.3"),
      chrome.debugger.sendCommand(target, "DOM.enable"),
      chrome.debugger.sendCommand(target, "Overlay.enable"),
      chrome.debugger.sendCommand(target, "Overlay.setShowFPSCounter", { show: !0 })
    )
  )
});