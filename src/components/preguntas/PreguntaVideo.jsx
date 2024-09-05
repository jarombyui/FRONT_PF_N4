import React, { useEffect, useRef, useContext } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { Authcontext } from '../../context/AuthContext'; 

function PreguntaVideo({ enunciado }) {
  const videoRef = useRef(null);
  const { setVideoURL } = useContext(Authcontext);
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
    previewStream,
  } = useReactMediaRecorder({ video: true, audio: true });

  const debeDetener = status === 'recording' || status === 'paused';
  const debePausar = status === 'recording';
  const debeIniciar = status === 'idle' || status === 'stopped';
  const debeReaundar = status === 'paused';

  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  useEffect(() => {
    if (mediaBlobUrl) {
      setVideoURL(mediaBlobUrl);
    }
  }, [mediaBlobUrl, setVideoURL]);

  return (
    <div className="flex flex-col items-center mb-6">
      <p className="font-bold mb-3 text-center">{enunciado}</p>
      <div className="flex gap-4 justify-center mb-3">
        {debeIniciar && (
          <button
            onClick={startRecording}
            type="button"
            className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-600 transition duration-300"
          >
            {status === 'idle' ? 'Iniciar grabación' : 'Grabar otra vez'}
          </button>
        )}
        {debeDetener && (
          <button
            onClick={stopRecording}
            type="button"
            className="px-4 py-2 bg-red-500 rounded-md text-white hover:bg-red-600 transition duration-300"
          >
            Detener
          </button>
        )}
        {debeReaundar && (
          <button
            onClick={resumeRecording}
            type="button"
            className="px-4 py-2 bg-yellow-500 rounded-md text-white hover:bg-yellow-600 transition duration-300"
          >
            Reanudar
          </button>
        )}
        {debePausar && (
          <button
            onClick={pauseRecording}
            type="button"
            className="px-4 py-2 bg-orange-500 rounded-md text-white hover:bg-orange-600 transition duration-300"
          >
            Pausar
          </button>
        )}
      </div>

      {(status === 'recording' || status === 'paused') && (
        <video
          ref={videoRef}
          controls
          autoPlay
          className="rounded-lg w-full max-w-lg object-contain"
        />
      )}
      {mediaBlobUrl && (
        <video
          src={mediaBlobUrl}
          controls
          autoPlay
          className="rounded-lg w-full max-w-lg object-contain"
        />
      )}
    </div>
  );
}

export default PreguntaVideo;
