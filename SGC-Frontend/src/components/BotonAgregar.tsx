interface Boton {
  texto: string;
  onclick: () => void;
  bg: string;
}
const BotonAgregar = ({ texto, onclick, bg }: Boton) => {
  return (
    <button
      className={`${bg} py-2 px-3 rounded text-black font-bold text-[15px]`}
      onClick={onclick}
    >
      {texto}
    </button>
  );
};
export default BotonAgregar;
