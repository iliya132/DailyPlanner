var modules = {
    modal: {
        showInfoModal: function (header, body, okCallback) {
            showCommonModal(header, body, okCallback, null, true, false);
        },
        showPromtModal: function (header, body, okCallback, cancelCallback) {
            showCommonModal(header, body, okCallback, cancelCallback, true, true);
        },
        askForTextInput: function (header, question, callback, cancelCallback) {
            showCommonModal(header, "<label>" + question + "</label><input id=\"modalInput\" class=\"text-input\" type=\"text\"/>", function () { return handleInputCallback(callback); }, cancelCallback, true, true);
            $('#modalInput').focus();
        },
        hideModal: function () {
            hideModalWindow();
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
//# sourceMappingURL=PlannerCore.js.map