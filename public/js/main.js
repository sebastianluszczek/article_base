document.addEventListener('DOMContentLoaded', function () {
    const sidenav_inst = M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
    const select_inst = M.FormSelect.init(document.querySelectorAll('select'), {});
    const chip_inst = M.Chips.init(document.querySelectorAll('.chips'), {});
});

CKEDITOR.replace('body', {
    plugins: 'wysiwygarea, toolbar,basicstyles,link'
});