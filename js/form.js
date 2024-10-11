document.getElementById('getProfitBtn').addEventListener('click', function() {
    if (!document.getElementById('formContainer')) {
        const formContainer = document.createElement('div');
        const background = document.createElement('div');
        formContainer.id = 'formContainer';
        background.id = 'background';
        const formHTML = `
            <form id="profitForm" action="form-handler.php" method="post">
                <span class="profitForm__title">Регистрация</span>
                <div class="profitForm__field">
                    <input type="text" id="name" name="name" placeholder="Имя" required>
                </div>
                <div class="profitForm__field">
                    <input type="text" id="companySite" name="companySite" placeholder="Сайт компании" required>
                </div>
                <div class="profitForm__field">
                    <input type="tel" id="phone" name="phone" placeholder="Телефон" required>
                </div>

                <button type="submit" id="getCodeBtn" disabled>Получить код</button>
                <div class="profitForm__checkout">
                    <input type="checkbox" id="termsCheck">
                    <label for="termsCheck">
                    Отправляя сведения через электронную форму, 
                    вы даете согласие на обработку персональных 
                    данных, в том числе сбор, хранение и передачу 
                    третьим лицам представленной вами информации 
                    на условиях Политики обработки персональных данных.
                    </label>
                </div>
            </form>
        `;

        formContainer.innerHTML = formHTML;
        document.body.appendChild(formContainer);
        document.body.appendChild(background);

        document.getElementById('background').addEventListener('click', function() {
            formContainer.remove();
            background.remove();
        });

        document.getElementById('termsCheck').addEventListener('change', function() {
            const getCodeBtn = document.getElementById('getCodeBtn');
            getCodeBtn.disabled = !this.checked;
        });

        document.getElementById('profitForm').addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateForm()) {
                const formData = new FormData(this);
                fetch('./form-handler.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Сеть не доступна.');
                    }
                    return response.json();
                })
                .then(data => {
                    alert(data.message);
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    alert('Ошибка при отправке данных.');
                });
            }
        });
    }
});

function validateForm() {
    const name = document.getElementById('name').value;
    const companySite = document.getElementById('companySite').value;
    const phone = document.getElementById('phone').value;

    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]+$/;
    const companySiteRegex = /^[a-zA-Zа-яА-ЯёЁ]+\.[a-zA-Zа-яА-ЯёЁ]+$/;
    const phoneRegex = /^\d{11}$/;

    if (!nameRegex.test(name)) {
        alert('Поле Имя должно содержать только русские или английские буквы.');
        return false;
    }

    if (!companySiteRegex.test(companySite)) {
        alert('Поле Сайт компании должно содержать русские или английские буквы и обязательную точку.');
        return false;
    }

    if (!phoneRegex.test(phone)) {
        alert('Поле Телефон должно содержать только 11 цифр.');
        return false;
    }

    return true;
}
