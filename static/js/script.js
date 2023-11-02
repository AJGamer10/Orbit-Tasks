$(document).ready(() => {
    // Selecionando os elementos
    const $form = $('#addTaskForm');
    const $formEdit = $('editTaskForm');

    const $titleInput = $('#titleInput');
    const $descriptionInput = $('#descriptionInput');
    const $expirationDate = $('#expirationDate');

    const $editTitleInput = $('#editTitleInput');
    const $editDescriptionInput = $('#editDescriptionInput');
    const $editExpirationDate = $('#editExpirationDate')

    const myModal = new bootstrap.Modal('#addTaskModal');
    const editModal = new bootstrap.Modal('#editTaskModal');
    const $modalCloseButton = $('#addTaskCloseButton');
    const $editCloseButton = $('#editTaskCloseButton');

    $modalCloseButton.click(() => {
        myModal.hide();
        $form.removeClass('was-validated');
    });

    $editCloseButton.click(() => {
        editModal.hide();
        $formEdit.removeClass('was-validated');
    });

    const formatDate = (date) => {
        const splitedDate = date.split('-')
        return (`${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`)
    }

    const createItemButton = (iconClass, btnClasses, clickHandler) => {
        let $button = $()
        if (iconClass === 'bi bi-pencil') {
            $button = $('<button data-bs-toggle="modal" data-bs-target="#editTaskModal"></button>').addClass(btnClasses);
        } else {
            $button = $('<button></button>').addClass(btnClasses);
            $button.click(clickHandler);
        }
        const $icon = $('<i></i>').addClass(iconClass);
        $button.append($icon);
        return $button
    }

    const addTaskToBoard = (title, description, expiration) => {
        const $newTask = $('<div></div>').addClass('list-item');
        const $taskTitle = $('<h3></h3>').addClass('fs-6').text(`${title} (${expiration})`);
        const $taskDescription = $('<p></p>').addClass('m-0 text-secondary description').text(description);
        const $editButton = createItemButton('bi bi-pencil', "btn btn-warning btn-sm", () => { })
        const $deleteButton = createItemButton('bi bi-x', 'btn btn-danger btn-sm', () => {
            $newTask.remove()
        });
        const $buttonsContainer = $('<div></div>').addClass('d-flex column-gap-2');
        const $textContainer = $('<div></div>')
        $textContainer.append($taskTitle, $taskDescription)
        $buttonsContainer.append($editButton, $deleteButton);
        $newTask.append($textContainer, $buttonsContainer);
        $('#tarefas-pendentes').append($newTask);
    };

    const editTask = (title, description, expiration) => {
        
    }

    // Evento para a submissão do formulário
    $form.submit(event => {
        // Cancelar o comportamento padrão do envio no formulário (Recarregar a página)
        event.preventDefault();

        // Verificar se o formlário é válido
        if ($form[0].checkValidity()) {
            // Adicionar a tarefa
            addTaskToBoard($titleInput.val(), $descriptionInput.val(), formatDate($expirationDate.val()))
            $form[0].reset();
            myModal.hide();
            $form.removeClass('was-validated');
        } else {
            $form.addClass('was-validated');
        };
    });

    $formEdit.submit(event => {
        // Cancelar o comportamento padrão do envio no formulário (Recarregar a página)
        event.preventDefault();


    });
});