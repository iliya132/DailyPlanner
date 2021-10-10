import { Guid } from "js-guid";

const modules = {
    modal: {
        showInfoModal: (header: string, body: string, okCallback: any) => {
            showCommonModal(header, body, okCallback, null, true, false);
        },
        showPromtModal: (header: string, body: string, okCallback: any, cancelCallback: any) => {
            showCommonModal(header, body, okCallback, cancelCallback, true, true);
        },
        askForTextInput: (header: string, question: string, callback: (string) => void, cancelCallback: any) => {
            let body = "<label>" + question + '</label><input id="modalInput" class="text-input" type="text"/>';
            showCommonModal(header, body, () => handleInputCallback(callback), cancelCallback, true, true);
            $('#modalInput').focus();
        },
        hideModal: () => {
            hideModalWindow();
        }
    },
    popup: {
        showInfo(title: string, body: string) {
            showPopup(popupType.info, title, body);
        },
        showWarning(title: string, body: string) {
            showPopup(popupType.warning, title, body);
        },
        showError(title: string, body: string) {
            showPopup(popupType.error, title, body);
        },
        showSucess(title: string, body: string) {
            showPopup(popupType.sucess, title, body);
        }
    }
};

export default modules;

function showCommonModal(header: string, body: string, onAccept: any = null, onCancel: any = null, showDefaultBtn: boolean = true, showCancelBtn: boolean = false) {
    $('#modalHeader').html(header);
    $('#modalContent').html(body);
    if (showDefaultBtn) {
        $('#modalDefaultBtn').show();
    } else {
        $('#modalDefaultBtn').hide();
    }
    if (showCancelBtn) {
        $('#modalExitBtn').show();
    } else {
        $('#modalExitBtn').hide();
    }
    if (onAccept) {
        $('#modalDefaultBtn').on('click', () => {
            onAccept();
            hideModalWindow();
        });
    } else {
        $('#modalDefaultBtn').on('click', () => {
            hideModalWindow();
        });
    }
    if (onCancel) {

        $('#modalExitBtn').on('click', () => {
            onCancel();
            hideModalWindow();
        });
    } else {
        $('#modalExitBtn').on('click', () => {
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

function handleInputCallback(callback: (string)=>void) {
    let userInput = $("#modalInput").val() as string;
    callback(userInput);
}
enum popupType {
    info,
    sucess,
    warning,
    error
}

var popups: HTMLDivElement[] = [];
function showPopup(type: popupType, title:string, body: string) {
    let wrapper = document.createElement('div')
    wrapper.id = `popup_${Guid.newGuid().toString()}`;
    switch (type) {
        case(popupType.sucess):
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
    let contentWrapper = document.createElement("div");
    contentWrapper.className = "contentWrapper";
    let contentHeader = document.createElement("div");
    contentHeader.className = "contentHeader";
    contentWrapper.appendChild(contentHeader);
    let headerText = document.createElement("div");
    headerText.className = "headerText";
    headerText.innerHTML = title;
    contentHeader.appendChild(headerText);
    let closeBtn = document.createElement("div");
    closeBtn.className = "closeBtn";
    let realCloseBtn = document.createElement("button");
    realCloseBtn.innerHTML = "X";
    realCloseBtn.onclick = () => hidePopup(wrapper);
    closeBtn.appendChild(realCloseBtn);
    contentHeader.appendChild(closeBtn);
    let content = document.createElement("div");
    content.className = "content";
    let bodyText = document.createElement("div");
    bodyText.className = "body";
    bodyText.innerHTML = body;
    content.appendChild(bodyText);
    contentWrapper.appendChild(content);
    wrapper.appendChild(contentWrapper);
    document.getElementsByTagName("body")[0].appendChild(wrapper);
    addPopup(wrapper);
    setTimeout(() => {
        hidePopup(wrapper);
    }, 5000);
}

function hidePopup(popup: HTMLDivElement) {
    document.getElementsByTagName("body")[0].removeChild(popup);
    removePopup(popup);
}

function removePopup(popup: HTMLDivElement) {
    popups = popups.filter(i => i.id != popup.id);
    placePopups();
}

var popupsSpacing = 10;

function addPopup(popup: HTMLDivElement) {
    popups.push(popup);
    if (popups.length > 5) {
        while (popups.length > 5) {
            hidePopup(popups[0]);
        }
    }
    
    placePopups();
    
}

function getHeight(elem: HTMLElement) {
    let heigth = 70 + popupsSpacing;
    try {
        return elem.getBoundingClientRect().height + popupsSpacing
    } catch {
        return heigth;
    }
}

function placePopups() {
    let currentBottom = 5;
    if (popups.length !== 0) {
        for (let i = 0; i < popups.length; i++) {
            if (i !== 0) {
                currentBottom += getHeight(popups[i]);
            }
            let curPopup = popups[i];
            let bottomStyle = currentBottom.toString() + "px";
            curPopup.style.bottom = bottomStyle;
            document.getElementById(curPopup.id).style.bottom = curPopup.style.bottom;
        }
    }
}