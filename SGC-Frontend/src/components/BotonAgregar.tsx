interface Boton {
  texto: string;
  onclick: () => void;
  bg: string;
}
const BotonAgregar = ({ texto, onclick, bg }: Boton) => {
  return (
    <button
      className={`${bg} sgc-button-primary text-[15px]`}
      onClick={onclick}
    >
      {texto}
    </button>
  );
};
export default BotonAgregar;
