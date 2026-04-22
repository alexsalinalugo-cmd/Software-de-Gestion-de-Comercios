interface Boton {
  texto: string;
  onclick: () => void;
}
const BotonAgregar = ({ texto, onclick }: Boton) => {
  return (
    <button
      className="bg-amber-400 py-2 px-3 rounded text-black font-bold text-[15px]"
      onClick={onclick}
    >
      {texto}
    </button>
  );
};
export default BotonAgregar;
