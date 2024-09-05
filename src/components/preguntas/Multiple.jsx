function Multiple({ enunciado, nameCheckbox, opciones }) {
  // console.log(opciones);
  if (!opciones || !Array.isArray(opciones)) {
    return <p>No hay opciones disponibles para esta pregunta.</p>;
  }

  return (
    <div className='flex flex-col gap-2'>
      <p className='font-bold'>{enunciado}</p>
      <div className='flex flex-col gap-1'>
        {opciones.map((o, i) => (
          <label key={i} className='cursor-pointer capitalize'>
            {o.opcion} <input type='radio' value={o.opcion} name={nameCheckbox} />
          </label>
        ))}
      </div>
    </div>
  );
}

export default Multiple;
