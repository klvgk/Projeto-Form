//Validador de formulário;
let validator = {
    //Analisa o envio;
    handleSubmit: (event) => {
        //Bloqueia os eventos padrões;
        event.preventDefault();

        //Variáveis;
        let send = true;
        let inputs = document.querySelectorAll('input');

        //Limpa os erros da tela para não acumular msgs na tela;
        validator.clearErrors();

        //Percorre os inputs;
        for (let i = 0; i < inputs.length; i++) {
            //Recebe os inputs;
            let input = inputs[i];
            //Checagem das regras dos inputs;
            let check = validator.checkInput(input);
            
            //Verifica se os inputs passaram nas regras;
            if (check !== true) {
                send = false;
                //Exibe o erro na tela;
                validator.showError(input, check);
            }
        }
        //Caso os inputs sejam validados, o form é enviado;
        if (send) {
            form.submit();
        }
    },
    //Responsável pela validação das regras dos inputs;
    checkInput: (input) => {

        //Recebe a propriedade data-rules a qual contém as regras do input;
        let rules = input.getAttribute('data-rules');

        //Caso tenha regras, começa a validação;
        if (rules !== null) {
            //Separa as regras;
            rules = rules.split('|');
            //Percorre as regras;
            for (let k in rules) {
                
                //Separa a regra quando tiver '=';
                let rDetails = rules[k].split('=');

                /*
                caso o rDetails não contenha '=' ele vai receber o valor da primeira separação de regras '|', que no caso é a required;
                caso o rDetails contenha o '=' ele vai receber o valor 'min' de 'min=2';
                Percorrendo cada caso do switch e fazendo suas validações de regra;
                */
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Campo não pode ser vazio.';
                        }
                        break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'Campo tem que ter pelo menos ' +rDetails[1]+' caracteres.'
                        }
                        break;
                    case 'email':
                        if(input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é valido!';
                            }
                        }
                        break;
                }
            }
        }
        return true;
    },
    //Recebe o input e o erro e joga ele na tela;
    showError: (input, error) => {
        //Muda a cor da borda do campo para vermelho;
        input.style.borderColor = '#FF0000';

        //Cria um elemento div, para mostrar o erro;
        let errorElement = document.createElement('div');
        //Adiciona a Classe CSS 'error' ao elemento criado;
        errorElement.classList.add('error');
        //Adiciona a mensagem de erro ao elemento criado;
        errorElement.innerHTML = error;

        /*
        input.parentElement: Isso seleciona o elemento pai (o elemento que contém o input, no caso, 'label');
        input.nextElementSibling: Isso seleciona o próximo elemento irmão do input, que é onde você deseja inserir o errorElement;
        input.parentElement.insertBefore(errorElement, input.nextElementSibling): Este trecho de código usa o método insertBefore 
        para inserir o errorElement antes do próximo elemento irmão do input dentro do elemento pai do input;
        */
        input.parentElement.insertBefore(errorElement, input.nextElementSibling);

    },
    //Limpa erros;
    clearErrors: () => {

        //Seleciona os inputs;
        let inputs = form.querySelectorAll('input');
        //percorre os inputs removendo as classes de estilização CSS;
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        //Seleciona a classe CSS .error;
        let errorElements = document.querySelectorAll('.error');
        //Percorre/remove a classe .error dos inputs;
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};

//Seleciona o formulário através da classe .validator
let form = document.querySelector('.validator');

//Faz a auditoria para quando for tentar enviar o formulário, ele fazer a validações completa de regras;
form.addEventListener('submit', validator.handleSubmit);


/*
Lembrando, essas validações são realizadas na parte do usuário, mas elas podem serem burladas, como por
exemplo, desativando o JS da página;
Essa validação DEVE SER FEITA OBRIGATORIAMENTE no server-side também;
*/