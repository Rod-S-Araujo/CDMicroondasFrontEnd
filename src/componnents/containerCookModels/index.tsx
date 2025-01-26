import {
  DeleteService,
  GetAll,
  PostService,
  UpdateService,
} from "@/api/services/cookModelsServices";
import ICookModel from "@/interfaces/ICookModel";
import { useEffect, useState } from "react";
import styles from "./containerCookModels.module.css";
import { useCookModel } from "../context/cookModelContext";

interface ContainerCookModelsProps {
  tempo: string;
  potencia: number;
  onNumberClick: (num: number) => void;
  onPowerClick: (num: number) => void;
}

const ContainerCookModels = ({
  tempo,
  potencia,
  onNumberClick,
  onPowerClick,
}: ContainerCookModelsProps) => {
  const [cookModels, setCookModels] = useState<ICookModel[]>([]);
  const { modelSelected, setModelSelected } = useCookModel();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [nome, setNome] = useState<string>("");
  const [alimento, setAlimento] = useState<string>("");
  const [stringCarregamento, setStringcarregamento] = useState<string>("");
  const [instrucoes, setInstrucoes] = useState<string>("");

  const createNewModel = async () => {
    const newModel: ICookModel = {
      nome,
      alimento,
      stringAquecimento: stringCarregamento,
      instrucoes,
      tempo: parseFloat(tempo.replace(":", ".")),
      potencia,
    };
    await PostService(newModel);
  };

  const updateModel = async () => {
    const newModel: ICookModel = {
      nome,
      alimento,
      stringAquecimento: stringCarregamento,
      instrucoes,
      tempo: parseFloat(tempo.replace(":", ".")),
      potencia,
    };
    await UpdateService(newModel);
  };

  useEffect(() => {
    const fetchCookModels = async () => {
      try {
        const models = await GetAll();
        setCookModels(models);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCookModels();
  }, []);

  const handleSelectModel = (model: ICookModel) => {
    if (modelSelected == model) {
      setModelSelected(null);
    } else {
      setModelSelected(model);
    }
  };

  const handleEditButton = (model: ICookModel) => {
    setIsEditing(true);
    setModelSelected(null);
    onNumberClick(model.tempo * 100);
    onPowerClick(model.potencia);
    setNome(model.nome);
    setAlimento(model.alimento);
    setInstrucoes(model.instrucoes);
    setStringcarregamento(model.stringAquecimento);
  };

  const handleCancelButton = () => {
    setNome("");
    setAlimento("");
    setInstrucoes("");
    setStringcarregamento("");
    setIsEditing(false);
  };

  return (
    <div className={styles.containerCookModel}>
      <div>
        <h6>Nome</h6>
        {modelSelected ? (
          <h5>{modelSelected.nome}</h5>
        ) : (
          <input
            type="text"
            placeholder="Insira o nome do modelo"
            className={styles.inputInfo}
            onChange={(e) => setNome(e.target.value)}
            value={nome}
            disabled={isEditing}
          />
        )}
        <span className={styles.barDetail}></span>
        <h5>Alimento</h5>
        {modelSelected ? (
          <h6>{modelSelected.alimento}</h6>
        ) : (
          <input
            type="text"
            placeholder="Qual tipo de alimento será preparado"
            className={styles.inputInfo}
            onChange={(e) => setAlimento(e.target.value)}
            value={alimento}
          />
        )}
        <h5>Instruções de preparo:</h5>
        {modelSelected ? (
          <h6>{modelSelected.instrucoes}</h6>
        ) : (
          <input
            type="text"
            placeholder="Cadastre instruções de preparo"
            className={styles.inputInfo}
            onChange={(e) => setInstrucoes(e.target.value)}
            value={instrucoes}
          />
        )}
        <h5>String de carregamento</h5>
        {modelSelected ? (
          <h6>{modelSelected.stringAquecimento}</h6>
        ) : (
          <input
            type="text"
            placeholder="Insira um caracter para identificação do aquecimento"
            className={styles.inputInfo}
            onChange={(e) => setStringcarregamento(e.target.value)}
            value={stringCarregamento}
          />
        )}
      </div>
      <ul>
        <h5>Selecione um modelo</h5>
        {cookModels.map((model, index) => (
          <div key={index} className={styles.containerItem}>
            <li
              className={`${styles.modelSeletor} ${
                model.alteravel === false ? styles.inalterable : ""
              }`}
              onClick={() => handleSelectModel(model)}
            >
              <div className={styles.itemSeletor}>
                <p>nome</p>
                <h6>{model.nome}</h6>
              </div>
              <div className={styles.itemSeletor}>
                <p>potencia</p>
                <h6>{model.potencia}</h6>
              </div>
              <div className={styles.itemSeletor}>
                <p>tempo</p>
                <h6>{model.tempo}</h6>
              </div>
            </li>
            <div className={styles.itemSeletor}>
              <button
                onClick={() => handleEditButton(model)}
                className={styles.editButton}
              >
                <h6>Edit</h6>
              </button>
              <button
                onClick={() => DeleteService(model.nome)}
                className={styles.deleteButton}
              >
                <h6>Delete</h6>
              </button>
            </div>
          </div>
        ))}
      </ul>
      <div>
        {isEditing ? (
          <>
            <button
              className={styles.buttonSaveEdit}
              onClick={() => updateModel()}
            >
              <h5>Editar</h5>
              <p>modelo existente</p>
            </button>
            <button
              className={styles.buttonSaveEdit}
              onClick={() => handleCancelButton()}
            >
              <h5>Calcelar</h5>
              <p>cancelar edição</p>
            </button>
          </>
        ) : (
          <button
            className={styles.buttonSaveEdit}
            onClick={() => createNewModel()}
          >
            <h5>Salvar</h5>
            <p>novo modelo</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default ContainerCookModels;
