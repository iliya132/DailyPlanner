import { Guid } from "js-guid";
var modules = {
    modal: {
        showInfoModal: function (header, body, okCallback) {
            showCommonModal(header, body, okCallback, null, true, false);
        },
        showPromtModal: function (header, body, okCallback, cancelCallback) {
            showCommonModal(header, body, okCallback, cancelCallback, true, true);
        },
        askForTextInput: function (header, question, callback, cancelCallback) {
            var body = "<label>" + question + '</label><input id="modalInput" class="text-input" type="text"/>';
            showCommonModal(header, body, function () { return handleInputCallback(callback); }, cancelCallback, true, true);
            $('#modalInput').focus();
        },
        hideModal: function () {
            hideModalWindow();
        }
    },
    popup: {
        showInfo: function (title, body) {
            showPopup(popupType.info, title, body);
        },
        showWarning: function (title, body) {
            showPopup(popupType.warning, title, body);
        },
        showError: function (title, body) {
            showPopup(popupType.error, title, body);
        },
        showSucess: function (title, body) {
            showPopup(popupType.sucess, title, body);
        }
    }
};
export default modules;
function showCommonModal(header, body, onAccept, onCancel, showDefaultBtn, showCancelBtn) {
    if (onAccept === void 0) { onAccept = null; }
    if (onCancel === void 0) { onCancel = null; }
    if (showDefaultBtn === void 0) { showDefaultBtn = true; }
    if (showCancelBtn === void 0) { showCancelBtn = false; }
    $('#modalHeader').html(header);
    $('#modalContent').html(body);
    if (showDefaultBtn) {
        $('#modalDefaultBtn').show();
    }
    else {
        $('#modalDefaultBtn').hide();
    }
    if (showCancelBtn) {
        $('#modalExitBtn').show();
    }
    else {
        $('#modalExitBtn').hide();
    }
    if (onAccept) {
        $('#modalDefaultBtn').on('click', function () {
            onAccept();
            hideModalWindow();
        });
    }
    else {
        $('#modalDefaultBtn').on('click', function () {
            hideModalWindow();
        });
    }
    if (onCancel) {
        $('#modalExitBtn').on('click', function () {
            onCancel();
            hideModalWindow();
        });
    }
    else {
        $('#modalExitBtn').on('click', function () {
            hideModalWindow();
        });
    }
    showModalWindow();
}
function showModalWindow() {
    $('#CommonModal').show();
    $('#darkWrapper').show();
    $('#darkWrapper').attr('style', 'opacity: 0.5; transition: opacity 0.3s;');
}
function hideModalWindow() {
    $('#CommonModal').hide();
    $('#darkWrapper').attr('style', 'opacity: 0; transition: opacity 0s;');
    $('#darkWrapper').hide();
    $('#modalDefaultBtn').unbind('click');
    $('#modalExitBtn').unbind('click');
}
function handleInputCallback(callback) {
    var userInput = $("#modalInput").val();
    callback(userInput);
}
var popupType;
(function (popupType) {
    popupType[popupType["info"] = 0] = "info";
    popupType[popupType["sucess"] = 1] = "sucess";
    popupType[popupType["warning"] = 2] = "warning";
    popupType[popupType["error"] = 3] = "error";
})(popupType || (popupType = {}));
var popups = [];
function showPopup(type, title, body) {
    var wrapper = document.createElement('div');
    wrapper.id = "popup_" + Guid.newGuid().toString();
    switch (type) {
        case (popupType.sucess):
            wrapper.className = "popupWrapper sucess";
            break;
        case (popupType.warning):
            wrapper.className = "popupWrapper warning";
            break;
        case (popupType.error):
            wrapper.className = "popupWrapper error";
            break;
        case (popupType.info):
            wrapper.className = "popupWrapper";
            break;
    }
    var contentWrapper = document.createElement("div");
    contentWrapper.className = "contentWrapper";
    var contentHeader = document.createElement("div");
    contentHeader.className = "contentHeader";
    contentWrapper.appendChild(contentHeader);
    var headerText = document.createElement("div");
    headerText.className = "headerText";
    headerText.innerHTML = title;
    contentHeader.appendChild(headerText);
    var closeBtn = document.createElement("div");
    closeBtn.className = "closeBtn";
    var realCloseBtn = document.createElement("button");
    realCloseBtn.innerHTML = "X";
    realCloseBtn.onclick = function () { return hidePopup(wrapper); };
    closeBtn.appendChild(realCloseBtn);
    contentHeader.appendChild(closeBtn);
    var content = document.createElement("div");
    content.className = "content";
    var bodyText = document.createElement("div");
    bodyText.className = "body";
    bodyText.innerHTML = body;
    content.appendChild(bodyText);
    contentWrapper.appendChild(content);
    wrapper.appendChild(contentWrapper);
    document.getElementsByTagName("body")[0].appendChild(wrapper);
    addPopup(wrapper);
    setTimeout(function () {
        hidePopup(wrapper);
    }, 5000);
}
function hidePopup(popup) {
    document.getElementsByTagName("body")[0].removeChild(popup);
    removePopup(popup);
}
function removePopup(popup) {
    popups = popups.filter(function (i) { return i.id != popup.id; });
    placePopups();
}
var popupsSpacing = 10;
function addPopup(popup) {
    popups.push(popup);
    if (popups.length > 5) {
        while (popups.length > 5) {
            hidePopup(popups[0]);
        }
    }
    placePopups();
}
function getHeight(elem) {
    var heigth = 70 + popupsSpacing;
    try {
        return elem.getBoundingClientRect().height + popupsSpacing;
    }
    catch (_a) {
        return heigth;
    }
}
function placePopups() {
    var currentBottom = 5;
    if (popups.length !== 0) {
        for (var i = 0; i < popups.length; i++) {
            if (i !== 0) {
                currentBottom += getHeight(popups[i]);
            }
            var curPopup = popups[i];
            var bottomStyle = currentBottom.toString() + "px";
            curPopup.style.bottom = bottomStyle;
            document.getElementById(curPopup.id).style.bottom = curPopup.style.bottom;
        }
    }
}
//# sourceMappingURL=PlannerCore.js.map