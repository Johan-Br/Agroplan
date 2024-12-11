document.addEventListener('DOMContentLoaded', function () {
    // Inicializar calendario
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día'
        },
        events: [], // Los eventos se agregarán aquí
        eventClick: function (info) {
            // Mostrar los detalles del evento
            var detalles = document.getElementById('detalles-evento');
            var titulo = document.getElementById('detalle-titulo');
            var fecha = document.getElementById('detalle-fecha');
            var eliminarBoton = document.getElementById('eliminar-evento');
            
            // Cambiar el contenido con los detalles del evento
            titulo.textContent = `Titulo: ${info.event.title}`;
            fecha.textContent = `Fecha: ${info.event.start.toLocaleDateString()}`;
            
            // Mostrar el botón de eliminar
            eliminarBoton.style.display = 'block';

            // Cuando se haga clic en el botón de eliminar, eliminar el evento
            eliminarBoton.onclick = function () {
                if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
                    // Eliminar el evento
                    info.event.remove();
                    detalles.innerHTML = '<h3>Detalles de la siembra</h3><p>Haz clic en un evento para ver los detalles aquí.</p>';
                    eliminarBoton.style.display = 'none'; // Ocultar el botón después de eliminar el evento
                }
            };
        }
    });

    calendar.render();

    // Manejar el formulario de siembra
    const form = document.getElementById('siembra-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const cultivo = document.getElementById('cultivo').value;
        const area = document.getElementById('area').value;
        const fecha = document.getElementById('fecha').value;

        // Agregar evento al calendario
        calendar.addEvent({
            title: `${cultivo} (${area} ha)`,
            start: fecha
        });

        alert('Siembra planificada exitosamente');
        form.reset();
    });
});

