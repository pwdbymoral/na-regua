document.addEventListener('DOMContentLoaded', function () {
    var popup = document.getElementById('popup');
    var popupClose = document.getElementById('popup-close');
    var agendeButton = document.querySelector('.agende__button');

    agendeButton.addEventListener('click', function () {
        popup.style.display = 'flex';
    });

    popupClose.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});

document.getElementById('booking-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var selectedService = document.getElementById('service').value;
    var selectedTime = document.getElementById('time').value;

    // Valida o formulário
    if (enviaValores()) {
        // Envia o agendamento
        alert('Agendamento confirmado!\nServiço: ' + selectedService + '\nHorário: ' + selectedTime);
        popup.style.display = 'none';
    } else {
        // O formulário não é válido
        alert('Por favor, preencha todos os campos obrigatórios ou corrija o número de telefone.');
    }
});

function enviaValores() {
    // Obtendo os valores dos campos
    var nameValue = document.querySelector("#name").value;
    var phoneValue = document.querySelector("#phone").value;
    var serviceValue = document.querySelector("#service").value;
    var dateValue = document.querySelector("#date").value;
    var timeValue = document.querySelector("#time").value;

    // Verificando se os campos obrigatórios foram preenchidos
    if (nameValue && phoneValue && serviceValue && dateValue && timeValue) {
        // Validando o número de telefone
        var phoneValid = new RegExp(/^[0-9]{11}$/).test(phoneValue);

        // Verificando se o número de telefone é válido
        if (phoneValid) {
            // Criando um objeto para representar os dados
            var body = {
                name: nameValue,
                phone: phoneValue,
                service: serviceValue,
                date: dateValue,
                time: timeValue,
            };

            // Envia dados para Webhook da plataforma MAKE INTEGROMAT para adicionar dados ao Google Agenda
            fetch('https://hook.us1.make.com/1tauzazjnlx3l7x0sgopel2ul3gud665',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });
            console.log(body);
            return true;
        }
    }
}
