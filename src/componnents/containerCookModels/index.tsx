import { GetAll } from "@/api/services/cookModelsServices";

const ContainerCookModels = async () => {
  try {
    const models = await GetAll();

    console.log(models);
  } catch (ex) {
    console.log(ex);
  }

  return (
    <>
      <div></div>
    </>
  );
};

export default ContainerCookModels;
