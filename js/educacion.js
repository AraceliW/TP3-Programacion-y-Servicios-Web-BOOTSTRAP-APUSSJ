$(document).ready(function () {

    // VALIDACION SIMPLE
    $('.solo-numeros').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $('.solo-letras').on('input', function () {
        this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    });

    $('.formato-fecha').on('input', function () {
        this.value = this.value.replace(/[^0-9/]/g, '');
    });


    // SIMULACIÓON DE PROCESO DE PAGO Y BANCO FALSO
    $('#btn-iniciar-simulacion').on('click', function() {
        $('#seccion-inicio').fadeOut(300, function() {
            $('#seccion-ecommerce').fadeIn(500);
        });
    });

    $('#form-pago').on('submit', function (e) {
        e.preventDefault();
        $('#modalErrorPago').modal('show');
    });

    $('#btn-ir-banco').on('click', function () {
        $('#modalErrorPago').modal('hide');
        $('#seccion-ecommerce').fadeOut(300, function () {
            $('#seccion-banco-falso').fadeIn(500);
        });
    });

    $('#form-banco-falso').on('submit', function (e) {
        e.preventDefault(); 
        $('#modalPhishing').modal('show');
    });


    //LOGICA DE INTERACCION EDUCATIVA
    $('#btn-aprender').on('click', function () {
        $('#modalPhishing').modal('hide');
        $('#form-banco-falso button').hide(); 
        $('#instrucciones-interactivas').fadeIn(); 
        $('.elemento-sospechoso').css('cursor', 'pointer'); 
    });

    let erroresEncontrados = 0;

    function verificarFinJuego() {
        if (erroresEncontrados === 3) {
            $('#seccion-banco-falso').fadeOut(300, function() {
                $('#seccion-educativa').fadeIn(500);
            });
        }
    }

    $('.elemento-sospechoso').on('click', function() {
        if (!$(this).hasClass('encontrado')) {
            
            $(this).addClass('encontrado'); 
            erroresEncontrados++;
            $('#contador-errores').text(erroresEncontrados);
            $(this).css({
                'border': '3px solid #295aa8',
                'background-color': '#a9accb',
                'border-radius': '5px',
                'padding': '10px'
            });

            //SweetAlert2
            let idError = $(this).attr('id');
            
            if (idError === 'error-logo') {
                Swal.fire({
                    title: '¡Excelente vista!',
                    text: "El logo tiene un error ortográfico ('Makro' en vez de 'Macro'). Los estafadores clonan los sitios pero suelen tener estos errores.",
                    icon: 'success',
                    iconColor: '#295aa8',
                    confirmButtonColor: '#295aa8'
                }).then(() => verificarFinJuego());
                
            } else if (idError === 'error-urgencia') {
                Swal.fire({
                    title: '¡Punto para ti!',
                    text: "Los bancos no usan la urgencia ('desbloquear tarjeta') para forzarte a iniciar sesión desde un link externo.",
                    icon: 'success',
                    iconColor: '#295aa8',
                    confirmButtonColor: '#295aa8'
                }).then(() => verificarFinJuego());
                
            } else if (idError === 'error-token') {
                Swal.fire({
                    title: '¡Regla de oro!',
                    text: "NUNCA un banco te pedirá el Token o PIN del cajero para iniciar sesión. Es solo para autorizar transferencias.",
                    icon: 'success',
                    iconColor: '#295aa8',
                    confirmButtonColor: '#295aa8'
                }).then(() => verificarFinJuego());
            }
        }
    });

});