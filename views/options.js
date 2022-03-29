//
////
//
//
//

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    restorePageSize()
    restoreFont()
    restoreBuyerFromOrder()
    restoreBuyerExtraInfo()
  })

  const pageSizeSelector = 'select[name=page-size]'
  document.querySelector(pageSizeSelector).addEventListener('change', storePageSize)

  function storePageSize() {
    browser.storage.sync.set({
      pageSize: document.querySelector(pageSizeSelector).value
    })
  }

  function restorePageSize() {
    browser.storage.sync.get('pageSize').then((result) => {
      let pageSize = result.hasOwnProperty('pageSize') ? result.pageSize : 'A4'
      document.querySelector(pageSizeSelector).value = pageSize
    })
  }

  const fontSelector = 'select[name=font]'
  document.querySelector(fontSelector).addEventListener('change', storeFont)

  function storeFont() {
    browser.storage.sync.set({
      font: document.querySelector(fontSelector).value
    })
  }

  function restoreFont() {
    browser.storage.sync.get('font').then((result) => {
      let font = result.hasOwnProperty('font') ? result.font : 'droid-sans'
      document.querySelector(fontSelector).value = font
    })
  }

  const buyerFromOrderSelector = 'input[name=buyer-from-order]'
  document.querySelector(buyerFromOrderSelector).addEventListener('change', storeBuyerFromOrder)

  function storeBuyerFromOrder() {
    browser.storage.sync.set({
      buyerFromOrder: document.querySelector(buyerFromOrderSelector).checked
    })
  }

  function restoreBuyerFromOrder() {
    browser.storage.sync.get('buyerFromOrder').then((result) => {
      let buyerFromOrder = result.hasOwnProperty('buyerFromOrder') ? result.buyerFromOrder : true
      document.querySelector(buyerFromOrderSelector).checked = buyerFromOrder
    })
  }

  const buyerExtraInfoSelector = 'textarea[name=buyer-extra-info]'
  document.querySelector(buyerExtraInfoSelector).addEventListener('change', storeBuyerExtraInfo)

  function storeBuyerExtraInfo() {
    browser.storage.sync.set({
      buyerExtraInfo: document.querySelector(buyerExtraInfoSelector).value
    })
  }

  function restoreBuyerExtraInfo() {
    browser.storage.sync.get('buyerExtraInfo').then((result) => {
      let buyerExtraInfo = result.hasOwnProperty('buyerExtraInfo') ? result.buyerExtraInfo : ''
      document.querySelector(buyerExtraInfoSelector).value = buyerExtraInfo
    })
  }
})()