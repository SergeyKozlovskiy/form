" use strict";
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
       let error = formValidate(form);

       let formData = new FormData(form);
       formData.append('image', formImage.files[0]);

       if(error === 0){
           form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
           if(response.ok){
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('_sending');
           } else{
               alert('ошибка');
               form.classList.remove('_sending');
           }
       }else{
           alert('Заполните обязательные поля');
       }
    }

    const formValidate = (form) => {
        let error = 0;
        let formReq = document.querySelectorAll('._req');
        for(let index = 0; index < formReq.length; index ++){
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else if(input.getAttribute('type') === 'checkbox' && input.checked === false){
                formAddError(input);
                error++;
            }else {
                if(input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    };

    const formAddError = (input) => {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    };
    const formRemoveError = (input) => {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    };

    const emailTest = (input) => {
        return !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.value);
    };

    const formImage = document.getElementById('formImage');
    const formPreview = document.getElementById('formPreview');

    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {
        // проверяем тип файла
        if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)){
            alert('Неправильное расширение файла');
            formImage.value = '';
            return;
        }
        // проверяем размер файла
        if(file.size> 2 * 1024 * 1024){
            alert('Файл должен быть не более 2мб');
            return;
        }

       var reader = new FileReader();
       reader.onload = function (e) {
        formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото"`;
       };
       reader.onerror = function(e){
           alert('ошибка');
       };
       reader.readAsDataURL(file); 
    }
});