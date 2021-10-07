const modules = {
    modal: {
        showInfoModal: (header: string, body: string, okCallback: any) => {
            showCommonModal(header, body, okCallback, null, true, false);
        },
        showPromtModal: (header: string, body: string, okCallback: any, cancelCallback: any) => {
            showCommonModal(header, body, okCallback, cancelCallback, true, true);
        },
        askForTextInput: (header: string, question: string, callback: (string) => void, cancelCallback: any) => {
            showCommonModal(header, `<label>${question}</label><input id="modalInput" class="text-input" type="text"/>`, ()=>handleInputCallback(callback), cancelCallback, true, true);
        },
        hideModal: () => {
            hideModalWindow();
        }
    }
};

export default modules;

function showCommonModal(header: string, body: string, onAccept: any = null, onCancel: any = null, showDefaultBtn: boolean = true, showCancelBtn: boolean = false) {
    console.log('modal!');
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