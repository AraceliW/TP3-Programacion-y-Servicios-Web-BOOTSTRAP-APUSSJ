$(document).ready(function () {
  const observerOptions = {
    root: null, 
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.articulo').forEach(articulo => {
    observer.observe(articulo);
  });


  $('.btn-filtro').on('click', function () {

    $('.btn-filtro').removeClass('activo');
    $(this).addClass('activo');

    let filtro = $(this).data('filter');

    if (filtro === 'todos') {
      $('.articulo').removeClass('d-none');
    } else {
      $('.articulo').addClass('d-none');
      $('.articulo.' + filtro).removeClass('d-none');
    }
  });


  $('#form-nuevo-comentario').on('submit', function (e) {
    e.preventDefault();

    let nombre = $('#input-nombre-comentario').val();
    let texto = $('#input-texto-comentario').val();
    let nuevoComentarioHTML = `
      <div class="d-flex flex-start mb-4 nuevo-comentario" style="display: none;">
        <img class="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp" alt="avatar" width="65" height="65" />
        <div class="card w-100 border-success">
          <div class="card-body p-4">
            <div class="">
              <h5>${nombre} <span class="badge bg-success ms-2">Nuevo</span></h5>
              <p class="small text-muted">Hace un momento</p>
              <p>${texto}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                 <a href="#!" class="text-decoration-none link-comentario me-2 btn-like">
                  <i class="fas fa-thumbs-up me-1"></i><span class="contador">0</span>
                </a>
                <a href="#!" class="text-decoration-none link-comentario btn-dislike">
                  <i class="fas fa-thumbs-down me-1"></i><span class="contador">0</span>
                </a>
                </div>
                <a href="#!" class="text-decoration-none link-comentario btn-responder"><i class="fas fa-reply me-1"></i> Responder</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;


    $('#contenedor-comentarios').prepend(nuevoComentarioHTML);
    $('.nuevo-comentario').fadeIn(500).removeClass('nuevo-comentario');
    $('#form-nuevo-comentario')[0].reset();
  });


  $(document).on('click', '.btn-like', function (e) {
    e.preventDefault();

    let $contador = $(this).find('.contador');
    let valorActual = parseInt($contador.text());

    $contador.text(valorActual + 1);
    $(this).addClass('text-success').css('pointer-events', 'none');
  });


  $(document).on('click', '.btn-dislike', function (e) {
    e.preventDefault();

    let $contador = $(this).find('.contador');
    let valorActual = parseInt($contador.text());

    $contador.text(valorActual + 1);

    $(this).addClass('text-danger').css('pointer-events', 'none');
  });

  $(document).on('click', '.btn-responder', function (e) {
    e.preventDefault();

    let tarjetaComentario = $(this).closest('.card-body');
    if (tarjetaComentario.find('.caja-respuesta').length === 0) {

      let cajaRespuesta = `
            <div class="caja-respuesta mt-3" style="display: none;">
                <textarea class="form-control mb-2 form-control-sm" rows="2" placeholder="Escribe tu respuesta..."></textarea>
                <button class="btn btn-sm btn-outline-success btn-enviar-respuesta">Enviar respuesta</button>
            </div>
        `;
      tarjetaComentario.append(cajaRespuesta);
      tarjetaComentario.find('.caja-respuesta').slideDown();
    }
  });

  $(document).on('click', '.btn-enviar-respuesta', function (e) {
    e.preventDefault();
    let $cajaRespuesta = $(this).closest('.caja-respuesta');
    let $tarjetaComentario = $(this).closest('.card-body');
    let respuestaTexto = $(this).siblings('textarea').val();

    if (respuestaTexto.trim() !== "") {
      let respuestaHTML = `
              <div class="d-flex flex-start mt-4 respuesta-nueva" style="display: none;">
                  <a class="me-3" href="#">
                    <img class="rounded-circle shadow-1-strong" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp" alt="avatar" width="40" height="40" />
                  </a>
                  <div class="flex-grow-1 flex-shrink-1">
                      <div class="p-3 bg-light border rounded">
                          <p class="mb-1 fw-bold">
                              Tú <span class="badge bg-success ms-1">Ahora</span>
                          </p>
                          <p class="small mb-0">
                              ${respuestaTexto}
                          </p>
                      </div>
                  </div>
              </div>
          `;
      $tarjetaComentario.append(respuestaHTML);
      $tarjetaComentario.find('.respuesta-nueva').fadeIn(400).removeClass('respuesta-nueva');
      $cajaRespuesta.slideUp(function () {
        $(this).remove();
      });
    }
  });
});

