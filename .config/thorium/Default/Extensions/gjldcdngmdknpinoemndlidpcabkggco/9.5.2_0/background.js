
const GA_ENDPOINT = 'https://www.google-analytics.com/mp/collect';
const GA_DEBUG_ENDPOINT = 'https://www.google-analytics.com/debug/mp/collect';
// Get via https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#recommended_parameters_for_reports
const MEASUREMENT_ID = 'G-PVL9W8B154';
const API_SECRET = 'xlZBJYpLQgCJBxsRLQcjXA';
const DEFAULT_ENGAGEMENT_TIME_MSEC = 100;

function parseJSON( str ) {
  if(typeof str != 'string'){
      return str;
  }
  var s;
  try{
      s = jQuery.parseJSON(str);
  }catch(e){
      s = (Function(str) )();
  }
  return s;
}

async function readLocalStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (chrome.runtime.lastError) {
        reject();
      }
      resolve(result[key]);
    });
  });
};

async function getOrCreateClientId () {
  let clientId  = await readLocalStorage('clientId');
  if (!clientId) {
    clientId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    chrome.storage.local.set({'clientId': clientId});
  }
  return clientId;
}

async function fireEvent(eventName, eventParams) {
  // Configure session id and engagement time if not present, for more details see:
  // https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#recommended_parameters_for_reports
  // if (!params.session_id) {
  //   params.session_id = await this.getOrCreateSessionId();
  // }
  // if (!eventParams.engagement_time_msec) {
  //   params.engagement_time_msec = DEFAULT_ENGAGEMENT_TIME_MSEC;
  // }

  const clientId = await getOrCreateClientId()
  try {
    fetch(
      `${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
      {
        method: 'POST',
        body: JSON.stringify({
          client_id: clientId,
          events: [
            {
              name: eventName,
              params: eventParams
            }
          ]
        })
      }
    );      
  } catch (e) {
    console.log('Google Analytics request failed with an exception', e);
  }
}

async function firePageView(path, title) {
  // Configure session id and engagement time if not present, for more details see:
  // https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#recommended_parameters_for_reports
  // if (!params.session_id) {
  //   params.session_id = await this.getOrCreateSessionId();
  // }
  // if (!params.engagement_time_msec) {
  //   params.engagement_time_msec = DEFAULT_ENGAGEMENT_TIME_MSEC;
  // }
  const clientId = await getOrCreateClientId()
  try {
    fetch(
      `${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
      {
        method: 'POST',
        body: JSON.stringify({
          client_id: clientId,
          events: [
            {
              name: 'page_view',
              params: {
                  page_path: path,
                  page_title: title
              }
            }
          ]
        })
      }
    );      
  } catch (e) {
    console.log('Google Analytics request failed with an exception', e);
  }
}

// mv3修改谷歌分析代码
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
      case 'GA_PAGE':
          var page = request.data.page || '/default';
          var title = request.data.title || 'title';
          firePageView(page, title)
          break;
      case 'GA_EVENT':
          var category = request.data.category || 'extention';
          var action = request.data.action || 'action';
          var label = request.data.label || 'label';
          fireEvent('extension_event', {
            category: category,
            action: action,
            label: label,
            value: chrome.runtime.getManifest().version,
          })
          break;
  }
  return true;
});

chrome.runtime.onMessage.addListener(function(req, sender, rescb){
    if(req.cmd == 'GET_STORAGE'){
        chrome.storage.local.get(req.key, function(items){
            rescb(parseJSON(items[req.key]));
        });
    }else if(req.cmd == 'SET_STORAGE'){
        var items = {};
        items[req.key] = req.value;
        chrome.storage.local.set(items);
    } else if(req.cmd == 'TRACK'){
        fireEvent('install', {'version': chrome.runtime.getManifest().version})
    }
    // else if(req.cmd == 'NET'){
    //     $.ajax($.extend({}, req.settings, {
    //         success: function(res){
    //             rescb({
    //                 status: 'ok',
    //                 data: res
    //             });
    //         },
    //         error: function(){
    //             rescb({
    //                 status: 'error'
    //             });
    //         }
    //     }));
    // }
    return true;
});

chrome.runtime.onInstalled.addListener(function(details) {
    if(details.reason == 'install') {
        var version = chrome.runtime.getManifest()['version'];
        chrome.storage.sync.set({'version': version}, function() {
        });
    }
    if( details.reason == 'install' ){
        chrome.storage.local.set({
            installTime: new Date().getTime()
        })
    }
    //edge
    let uiLanguage = chrome.i18n.getUILanguage()
    if(uiLanguage === 'zh-CN') {
        if (details.reason === 'install') {
            chrome.tabs.create({ url: 'https://extensions-manager.com' });
        }
        chrome.runtime.setUninstallURL("https://extensions-manager.com/feedback.html", function() {
            // console.log('unstall')
        })
    }
});

chrome.storage.local.get(['uuid', 'installTime'], function(items){
    if(!items.installTime){
        items.installTime = Date.now();
        chrome.storage.local.set({
            installTime: items.installTime
        });
    }
});

// function updateState(id, able) {
//     Manage.updateState(id, able)
// };
// window.updateState = updateState;

chrome.tabs.onCreated.addListener(function (tab) {
    // console.log('new tab')
    if(checkValidUrl(tab.url)) {
        // todo 创建新标签页的时候是不是可以不用调用manage 因为会调用update
        manage(tab.id)
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // console.log('update tab start', tabId)
    // console.log(tabId)
    // console.log("changeInfo", changeInfo)
    // console.log("tab", tab)
    if (checkValidUrl(changeInfo.url)) { 
        // console.log("changeInfo.url", changeInfo.url)
        manage(tab.id)
        // const oldUrl = tabs[tabId]
        // let changeUrl = filterUrl(changeInfo.url)
        // console.log("changeInfo.url2", changeInfo.url)
        // if (oldUrl != changeUrl) {
        //   tabs[tabId] = changeUrl;
        //   manage(tabId);
        // }
    }
    // if (changeInfo.status == 'complete' && tab.active) {
    //     console.log("Active tab updated, let's do something!");
    //     let changeUrl = filterUrl(tab.url)
    //     console.log("changeUrl1", tab.url)
    //     console.log("changeUrl2", changeUrl)
    //     // manage(tab.id)
    // }
    // console.log('update tab end')
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    // console.log('onRemoved')
    // console.log(removeInfo)
    manage();
});

chrome.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
    // console.log('onReplaced')
    // console.log(addedTabId)
    // console.log(removedTabId)
    // replaceTab(addedTabId, removedTabId)
    chrome.tabs.get(addedTabId, (tab) => {
        if (checkValidUrl(tab.url)) {
            // tabs[tab.id] = filterUrl(tab.url)
            manage(tab.id)
        } 
    });
});

function checkValidUrl(url) {
  if(!url) {
    return false
  }
  // console.log("check url", url)
  // edge新打开的系统空标签页地址是 edge://newtab/ 
  // edge的扩展管理页面是 edge://extensions/
  // edge的安装扩展的option页面地址 chrome-extension:// 但是浏览器的地址栏却显示extension://

  // chrome新打开的系统空标签页地址是 chrome://newtab/
  // chrome的扩展管理页面是 chrome://extensions
  // chrome的安装扩展的option页面地址 chrome-extension:// 
  if (url.startsWith('chrome:') || url.startsWith('edge:') || url.startsWith('chrome-extension:') || url.startsWith('file://')) {
    return false
  }
  return true
}

async function manage(tabId) {
  // console.log("manage start.................", tabId)
  let tabs = await fetchTabs()
  console.log("allTabs", tabs)
  // console.log("after all tabs")
  // return

  // console.error('manage')
  // console.error(tabs)
  let allRules = await getSyncItem('_rule_')
  // console.log(allRules)

  if (allRules) {
    const nextPhases = {}
    let enableOnlys = {}
    let disableOnlys = {}
    let rules = allRules.list.filter((ruleItem) => !ruleItem.disabled)

    //这里是遍历所有的rule 也就会遍历所有rule的扩展id
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i]
      let affectedIds = rule.ids
      let tabIds = Object.keys(tabs)
      let matched = false
      const pattern = safeRegex(rule.match.regExp)

      for (let j = 0; j < tabIds.length; j++) {
        let url = tabs[tabIds[j]]
        if (pattern.test(url)) {
          // console.error('url:' + url)
          matched = true
          // console.error('matched:' + matched)
          break
        }
      }

      switch (rule.action) {
        case 'enableOnly':
          if (matched) {
            Object.keys(affectedIds).map((id) => {
              enableOnlys[id] = true
              // nextPhases[id] = true
              nextPhases[id] = {
                enabled: true,
                tabId,
                ruleId: i,
              }
            })
          } else {
            Object.keys(affectedIds).map((id) => {
              // if (enableOnlys[id] === undefined) {
              //   enableOnlys[id] = false
              // } else {
              //   enableOnlys[id] = false || enableOnlys[id]
              // }
              // nextPhases[id] = enableOnlys[id] || false
              nextPhases[id] = {
                enabled: enableOnlys[id] || false,
                ruleId: i,
              }
            })
          }
          break

        case 'disableOnly':
          if (matched) {
            Object.keys(affectedIds).map((id) => {
              disableOnlys[id] = true
              nextPhases[id] = {
                enabled: false,
                tabId,
                ruleId: i,
              }
            })
          } else {
            Object.keys(affectedIds).map((id) => {
              nextPhases[id] = {
                enabled: !disableOnlys[id] && true,
                ruleId: i,
              }
              // nextPhases[id] = !disableOnlys[id] && true
            })
          }
          break

        case 'enableWhen':
          if (matched) {
            Object.keys(affectedIds).map((id) => {
              // nextPhases[id] = true
              nextPhases[id] = {
                enabled: true,
                tabId,
                ruleId: i,
              }
            })
          }
          break

        case 'disableWhen':
          if (matched) {
            Object.keys(affectedIds).map((id) => {
              nextPhases[id] = {
                enabled: false,
                ruleId: i,
              }
              // nextPhases[id] = false
            })
          }
          break
      }
    }
    // 规则
    // 规则作为分组（普通分组和固定分组）的补充 如果当前配置的规则和分组有冲突 则以分组为准
    // let groupIndex = Number.parseInt(localStorage.getItem('_groupIndex_')) || 0
    // let gids = await getSyncItem('_group_') || {
    //   list: [{
    //     'name': '',
    //     'lock': {}
    //   }]
    // }
    // let fids = await getSyncItem('_fix_') || {}

    // console.error("gids")
    // console.error(gids)

    // console.error("fids")
    // console.error(fids)

    const idList = Object.keys(nextPhases)
    let x = await Promise.all(
      idList.map((id) => {
        const phase = nextPhases[id]
        return setAppState(id, phase.enabled, phase.tabId, phase.ruleId)
      })
    )
    let tabIdRefresh = x.reduce((accumulator, current) => {
      return accumulator || current
    }, null)
    // console.log("tabIdRefresh", tabIdRefresh);
    if (tabIdRefresh) {
      // let tabUrlRefresh = tabs[tabIdRefresh]
      // console.error(tabUrlRefresh)
      // console.log("tabIdRefresh", tabIdRefresh)
      chrome.tabs.reload(tabIdRefresh)
    }

    // console.error(state)
    // Object.keys(nextPhases).forEach(idkey => {
    //   // 启用扩展
    //   if (nextPhases[idkey]) {
    //     // console.error('able:' + idkey)
    //     chrome.management.setEnabled(idkey, true, () => {
    //       // callback && callback()
    //     })
    //   } else {
    //     chrome.management.setEnabled(idkey, false, () => {
    //       // callback && callback()
    //     })

    //     // 如果当前分组或者固定分组中 则不能关闭扩展
    //     // if (gids.list[groupIndex].lock[idkey] || fids[idkey]) {
    //     //   enableOnlys[idkey] = true
    //     // } else {
    //     //   console.error('diable:' + idkey)
    //     //   chrome.management.setEnabled(idkey, false, () => {
    //     //   })
    //     // }
    //   }
    // })

    //同步enableOnlys
    chrome.storage.local.set(
      {
        _ruleable_: nextPhases,
      },
      function () {
        if (chrome.runtime.lastError) {
          // console.log("Error Storing: " + chrome.runtime.lastError);
        } else {
          // console.log("Success Storing _ruleable_");
        }
      }
    )
  }
}

function safeRegex(expr) {
  try {
    return new RegExp(expr)
  } catch (error) {
    console.log(error)
    // _ = error;
    // Invalid regexp! Fall back to a regexp that does not match anything.
    return /(?!)/
  }
}

function getSyncItem(key) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, function (itemRule) {
      resolve(itemRule[key])
    })
  })
}

function fetchTabs() {
  return new Promise((resolve) => {
    chrome.tabs.query({}, (tabList) => {
      let tabs = {}
      for (let i = 0; i < tabList.length; i++) {
        const tabInfo = tabList[i]
        tabs[tabInfo.id] = filterUrl(tabInfo.url)
      }
      resolve(tabs)
    })
  })
}

function setAppState(id, enabled, tabId, ruleId) {
  return new Promise(async (resolve) => {

    const extensionInfo = await getExtensionInfo(id);
    
    if(extensionInfo && extensionInfo.enabled != enabled) {
      await toggle(id, enabled)
      resolve(tabId)
    } else {
      console.log("no need to change extension state")
    }

    
    // if (state[id] != enabled) {
    //   state[id] = enabled;
    //   await toggle(id, enabled);
    //   resolve(tabId);
    // } else {
    //   resolve();
    // }
  })
}

function getExtensionInfo(extensionId) {
  return new Promise((resolve, reject) => {
    chrome.management.get(extensionId, function(extensionInfo) {
      if (chrome.runtime.lastError) {
        // reject(chrome.runtime.lastError);
        resolve();
      } else {
        resolve(extensionInfo);
      }
    });
  });
}

function toggle(id, enabled) {
  return new Promise((resolve) => {
    // console.error(id + ":" + enabled)
    chrome.management.setEnabled(id, enabled, () => {
      // state[id] = enabled
      resolve()
    })
  })
}

function filterUrl(linkurl) {
  if(linkurl) {
    linkurl = linkurl.replace(/(^\w+:|^)\/\//, '')
    if (linkurl.charCodeAt(linkurl.length - 1) === 47) {
      linkurl = linkurl.substring(0, linkurl.length - 1)
    }
    return linkurl
  }
  return ""
}




// getOrCreateClientId()
// Manage.init();


