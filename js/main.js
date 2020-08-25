$(document).ready(function(){

    $("form").submit(function(){ // перехватываем все при событии отправки
        var form = $(this); // запишем форму, чтобы потом не было проблем с this
        var error = false; // предварительно ошибок нет

        if (!error) { // если ошибки нет
            var data = form.serialize(); // подготавливаем данные
            $.ajax({ // инициализируем ajax запрос
                type: 'POST', // отправляем в POST формате, можно GET
                url: '/mail.php', // путь до обработчика, у нас он лежит в той же папке
                dataType: 'json', // ответ ждем в json формате
                data: data, // данные для отправки
                beforeSend: function(data) { // событие до отправки
                    form.find('button[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
                },
                success: function(data){ // событие после удачного обращения к серверу и получения ответа data-ответ сервера
                    if (data['error']) { // если обработчик вернул ошибку
                        alert(data['error']); // покажем её текст
                    } else { // если все прошло ок{
                        $('.main_inp_modal').val('');
                        $('.main_inp').val('');
                        $('.info_form_inp').val('');
                        exit_fancy();

                        $(".btn").trigger('click');

                        function exit_fancy() {
                            $.fancybox.close();
                        }
                        setTimeout(exit_fancy, 1000);

                    }


                },
                error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
                    alert(xhr.status); // покажем ответ сервера
                    alert(thrownError); // и текст ошибки
                },
                complete: function(data) { // событие после любого исхода
                    form.find('button[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
                }

            });
        }
        return false; // вырубаем стандартную отправку формы
    });

$("#test").hover(function() {
    $(this).css("fill", "red");
},
    function () {
        $(this).css("fill", "green");
    }
);

});