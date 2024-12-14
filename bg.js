chrome.action.onClicked.addListener(async tab => {
  let id = tab.id;
  let tabId = { tabId: id };
  (await chrome.debugger.getTargets()).find(v => v.tabId == id).attached
  ? chrome.debugger.detach(tabId)
  : (
    chrome.debugger.attach(tabId, "1.3"),
    chrome.debugger.sendCommand(tabId, "DOM.enable"),
    chrome.debugger.sendCommand(tabId, "Overlay.enable"),
    chrome.debugger.sendCommand(tabId, "Overlay.setShowFPSCounter", { show: !0 })
  )
})