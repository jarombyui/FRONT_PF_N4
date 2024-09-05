import { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Authcontext } from '../../context/AuthContext';
import Multiple from '../preguntas/Multiple';
import PreguntaVideo from '../preguntas/PreguntaVideo';
import Simple from '../preguntas/Simple';

const ExamForm = () => {
  const { dataUser, useExamen, videoURL } = useContext(Authcontext);
  const { id } = useParams();
  const { data, isLoading, examenMutation } = useExamen(id);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const respuestas = data.preguntas.map(p => {
        const inputPregunta = event.target[p._id];
        return {
          pregunta: p._id,
          respuestaAlumno: p.tipo === 'video' ? '' : inputPregunta ? inputPregunta.value : '',
        };
      });

      let videoBlob = null;
      if (videoURL) {
        const res = await fetch(videoURL);
        if (!res.ok) throw new Error('Error al cargar el video');
        videoBlob = await res.blob();
      }

      const formData = new FormData();
      formData.append('examen', data._id);
      formData.append('respuestas', JSON.stringify(respuestas));
      if (videoBlob) {
        formData.append('video', videoBlob, 'respuesta.mp4');
      }

      await examenMutation.mutateAsync(formData);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full h-full">
        <h1 className="text-2xl font-bold text-center text-blue-500 mb-4">Elementary</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-xl">
          {data.preguntas.map(p => {
            if (p.tipo === 'simple') {
              return (
                <Simple key={p._id} enunciado={p.pregunta} nameInput={p._id} />
              );
            }

            if (p.tipo === 'multiple') {
              return (
                <Multiple
                  key={p._id}
                  enunciado={p.pregunta}
                  nameCheckbox={p._id}
                  opciones={p.opciones}
                />
              );
            }

            if (p.tipo === 'video') {
              if (dataUser?.role === 'user') {
                return <PreguntaVideo key={p._id} enunciado={p.pregunta} />;
              }

              if (dataUser?.role === 'admin') {
                return (
                  <button
                    type="button"
                    className="bg-blue-500 text-white rounded-lg py-2 px-4 w-full hover:bg-blue-600 transition duration-300"
                  >
                    Calificar Video
                  </button>
                );
              }
            }

            return null;
          })}

          {dataUser?.role === 'user' && (
            <button
              type="submit"
              className="bg-green-500 text-white rounded-lg py-2 px-4 w-full hover:bg-green-600 transition duration-300"
            >
              Finalizar examen
            </button>
          )}

          {dataUser?.role === 'admin' && (
            <Link to="/examenes">
              <button
                type="button"
                className="bg-green-500 text-white rounded-lg py-2 px-4 w-full hover:bg-green-600 transition duration-300"
              >
                Finalizar edición
              </button>
            </Link>
          )}

        </form>

        <Link to="/examenes">
          <button className="bg-red-500 text-white rounded-lg py-2 px-4 w-full hover:bg-red-600 transition duration-300 mt-4">
            Cancelar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ExamForm;
