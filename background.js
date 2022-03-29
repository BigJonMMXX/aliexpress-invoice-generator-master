//

(() => {
  //browser.runtime.onInstalled.addListener(onExtensionUpdated)
  browser.pageAction.onClicked.addListener(onPageActionClicked)
  browser.runtime.onConnect.addListener(onConnect)

  function onExtensionUpdated(info) {
    if (info.temporary) {
      return
    }
    switch (info.reason) {
      case 'install':
        {
          const url = browser.runtime.getURL("views/onboard.html")
          browser.tabs.create({ url })
        }
        break
      case 'update':
        {
          const url = browser.runtime.getURL("views/upboard.html")
          browser.tabs.create({ url })
        }
        break
    }
  }

  function onPageActionClicked(tab) {
    let port = browser.tabs.connect(tab.id)
    port.postMessage({})
  }

  function onConnect(port) {
    port.onMessage.addListener((message) => {
      port.disconnect()
      switch (message.action) {
        case 'show-page-action':
          browser.pageAction.show(port.sender.tab.id)
          break
        case 'open-settings':
          browser.runtime.openOptionsPage()
          break
        case 'store-pdf':
          storePdf(message.chunks, message.date, message.number)
          break
      }
    })
  }

  function storePdf(chunks, date, number) {
    let arrayChunks = chunks
    // Chrome converts [Uint8Array] to a JSON object during messaging, convert it back here
    if (chunks.length > 0 && chunks[0].constructor === Object && chunks[0].data !== undefined) {
      arrayChunks = chunks.map(chunk => new Uint8Array(chunk.data))
    }
    browser.downloads.download({
      url: URL.createObjectURL(new Blob(arrayChunks, {type: 'application/pdf'})),
      filename: `invoice-${getFilenameComponent(date)}-${getFilenameComponent(number)}.pdf`,
      saveAs: true
    })
  }

  function getFilenameComponent(string) {
    return string ? string.replace(/^\s+|\s+$/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9_-]/gi, '') : ''
  }
})()
