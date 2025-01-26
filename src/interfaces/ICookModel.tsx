interface ICookModel {
  nome: string;
  alimento: string;
  tempo: number;
  potencia: number;
  stringAquecimento: string;
  instrucoes: string;
  alteravel?: boolean;
}

export default ICookModel;
