document.getElementById('multaForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita la recarga automática del formulario

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        // Envía los datos del formulario al servidor
        const response = await fetch(form.action, {
            method: form.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
            // Muestra notificación de éxito
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: result.message,
                toast: true,
                position: 'bottom-right',
                timer: 3000,
                showConfirmButton: false,
            }).then(() => {
                // Recarga la página después de la notificación
                window.location.reload();
            });

            form.reset(); // Limpia el formulario
        } else {
            // Muestra notificación de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: result.message,
                toast: true,
                position: 'bottom-right',
                timer: 3000,
                showConfirmButton: false,
            });
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        // Muestra notificación de error genérico
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error inesperado',
            toast: true,
            position: 'bottom-right',
            timer: 3000,
            showConfirmButton: false,
        });
    }
});

//boton para borrar
document.addEventListener('DOMContentLoaded', () => {
    // Captura todos los botones con la clase 'delete-button'
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault(); // Evita la acción por defecto del enlace

            const id = button.getAttribute('data-id'); // Obtiene el ID del registro
            const deleteUrl = button.getAttribute('href'); // URL del enlace

            // Muestra la ventana de confirmación
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'No podrás revertir esta acción',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            // Si el usuario confirma, realiza la eliminación
            if (result.isConfirmed) {
                try {
                    const response = await fetch(deleteUrl, {
                        method: 'GET', // Asegúrate de configurar este método en tu servidor
                    });

                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminado',
                            text: 'Multa eliminada correctamente',
                            toast: true,
                            position: 'bottom-right',
                            timer: 3000,
                            showConfirmButton: false,
                        }).then(() => {
                            // Recarga la página para actualizar la tabla
                            window.location.reload();
                        });
                    } else {
                        throw new Error('No se pudo eliminar el registro');
                    }
                } catch (error) {
                    console.error('Error al eliminar el registro:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al eliminar el registro',
                        toast: true,
                        position: 'bottom-right',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                }
            }
        });
    });
});


// modal de edicion
document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.edit-button');
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');
    const cancelEdit = document.getElementById('cancelEdit');

    // Rellena el modal con los datos del botón clicado
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            const nombre = button.dataset.nombre;
            const apellido = button.dataset.apellido;
            const dni = button.dataset.dni;
            const patente = button.dataset.patente;
            const multa = button.dataset.multa;
            const jurisdiccion = button.dataset.jurisdiccion;

            // Rellena los campos del formulario
            document.getElementById('editId').value = id;
            document.getElementById('editNombre').value = nombre;
            document.getElementById('editApellido').value = apellido;
            document.getElementById('editDni').value = dni;
            document.getElementById('editPatente').value = patente;
            document.getElementById('editMulta').value = multa;
            document.getElementById('editJurisdiccion').value = jurisdiccion;

            // Muestra el modal
            editModal.classList.remove('hidden');
        });
    });

    // Cierra el modal
    cancelEdit.addEventListener('click', () => {
        editModal.classList.add('hidden');
    });

    // Envía el formulario
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(editForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`/dashboard/multas/edit/${data.id}`, {
                method: 'POST', // Cambia según el método que uses en tu backend
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: result.message,
                    toast: true,
                    position: 'bottom-right',
                    timer: 3000,
                    showConfirmButton: false,
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message,
                    toast: true,
                    position: 'bottom-right',
                    timer: 3000,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error('Error al actualizar:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error inesperado',
                toast: true,
                position: 'bottom-right',
                timer: 3000,
                showConfirmButton: false,
            });
        }
    });
});
