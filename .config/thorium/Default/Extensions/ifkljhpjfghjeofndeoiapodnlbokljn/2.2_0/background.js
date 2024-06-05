chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
      var welcomeURL = 'https://wall.cpx-research.com/app_okay.php?type=install';
      chrome.tabs.create({ url: welcomeURL });
  }
})

var surveyStarted = false
var redirects = []
var screenshots = []
var surveyId = "asdf"
var tabId = null

var screenshotTimer = null

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === "screenshotTaken") {
      console.log("screenshot")
      sendSurveyData(null, request.screenshot, request.screenshotUrl, request.html)
    }

    if(request.message === "surveyStarted") {
      resetValues()
      console.log("survey_started")
      surveyStarted = true
      surveyId = getSurveyID(request.surveyUrl)
      tabId = sender.tab.id

      setTimeout(function() {
        stopTracking()
      }, 1860000)
    }

    if(request.message === "hasSurveyStarted") {
      if(sender.tab.id === tabId) {
        sendResponse({started: surveyStarted})
      }
    }
    return true
});

//Trackt die Web Requests. Wenn es main_frame ist(d.h. eine Anfrage für eine Seite) und die Umfrage angefangen hat(wird mit der URL überprüft) werden die Redirects getrackt.
var callback = function(details) {
  if(details.type === "main_frame") {
    if(surveyStarted) {
      if(details.tabId === tabId) {
        requestScreenshot()
        logRedirects(details)
      }
    }
  }
};

//Web Request Listener
var filter = {urls: ["<all_urls>"]};
var opt_extraInfoSpec = ["responseHeaders"];

chrome.webRequest.onCompleted.addListener(
      callback, filter, opt_extraInfoSpec);

//Extrahiert die Umfragen ID aus der URL
function getSurveyID(surveyUrl) {
  return surveyUrl.split("=")[1].split("&")[0]
}

//Loggt die Redirects in einer Liste
function logRedirects(details) {
  if(details.tabId === tabId) {
    console.log("redirectSent")
    redirects.push(details.url)
    sendSurveyData(details.url, null, null, null)
  }
}

//Fragt das Content Script nach einem Screenshot an
function requestScreenshot() {
  if(tabId !== null) {
    chrome.tabs.sendMessage(tabId, { message: "screenshot" }, {}, function(response) {
      if(chrome.runtime.lastError) {
      } else {
      }
    });
  }
}


//Benachrichtigt das Content Script, wenn die Umfrage beendet
function surveyStopped() {
  if(tabId !== null) {
    chrome.tabs.sendMessage(tabId, { message: "surveyStopped", redirects: redirects, surveyId: surveyId }, {}, function(response) {
      if(chrome.runtime.lastError) {
      } else {
      }
    });
  }
}

function surveyStarted() {
  if(tabId !== null) {
    chrome.tabs.sendMessage(tabId, { message: "surveyStarted"}, {}, function(response) {
      if(chrome.runtime.lastError) {
      } else {
      }
    });
  }
}

//Hört auf zu Tracken
function stopTracking() {
  surveyStarted = false
  surveyStopped()
  resetValues()
}

//Setzt die Daten zurück, wenn die Umfrage zuende ist
function resetValues() {
  redirects = []
  screenshots = []
  surveyId = ""
  tabId = null
  if(screenshotTimer !== null) {
    clearInterval(screenshotTimer)
  }
}

function sendSurveyData(redirect, screenshot, screenshotUrl, html) {
  var xhr = new XMLHttpRequest(); 
  var url = "http://log.cpx-research.com/indexv2.php";

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Response
    }
  };

  var data = null
  if(html === null) {
    if(redirect === null) {
      data = JSON.stringify({ "surveyId": surveyId, "screenshot": screenshot, "screenshotUrl": screenshotUrl});
    }
    if(screenshot === null) {
      console.log("sendingRedirect")
      data = JSON.stringify({ "surveyId": surveyId, "redirect": redirect });
    }
  }

  if(html !== null) {
    if(redirect === null) {
      data = JSON.stringify({ "surveyId": surveyId, "screenshot": screenshot, "screenshotUrl": screenshotUrl, "html": html});
    }
  }

  
  xhr.send(data);
  console.log("request sent")
}

setInterval(() => {
  if(surveyStarted) {
    console.log("screenshotFromLoop")
    requestScreenshot()
  }
}, 5000)

chrome.webRequest.onBeforeRedirect.addListener(function (details) {
  if(surveyStarted) {
    if(details.tabId === tabId) {
      if(details.url.toLowerCase().includes("cpx-research.com/tracker/redirect.php")) {
        stopTracking()
        console.log(surveyId)
        logRedirects(details)
        console.log("survey_stopped")
      }
    }
  }
  console.log(details)
}, {urls: ["<all_urls>"], types: ["main_frame"]}, ["responseHeaders"]);

chrome.runtime.setUninstallURL("https://wall.cpx-research.com/app_okay.php?type=uninstall");