import toastr from 'toastr';

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function showMessage(title, message, type) {
    toastr[type](message, title);
}

export function showErrorMessage(message) {
    showMessage(null, message, 'error');
}

export function showSuccessMessage(message) {
    showMessage(null, message, 'success');
}

export function showInfoMessage(message) {
    showMessage(null , message, 'info');
}

export function showWarningMessage(message) {
    showMessage(null, message, 'warning');
}