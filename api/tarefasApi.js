import axios from "axios";

const instance = axios.create({
  baseURL: "https://parseapi.back4app.com/classes",
  headers: {
    "X-Parse-Application-Id": "4cRNaPFAu9tGO59OrBIJpH4v6qeHUUbtReuVmjP7",
    "X-Parse-Client-Key": "tGuNs9tDkrSX2APoRwnbSAiXhOGBuMqsgrq0ZWXJ",
  },
});

export const getTarefas = async () => {
  const response = await instance.get("/Tarefa");
  return response.data;
};

export const createTarefa = async ({ descricao }) => {
  const response = await instance.post(
    `/Tarefa`,
    { descricao },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("post - response.status", response.status);
  console.log("post - response.data", response.data);
  return response.status;
};

export const updateTarefa = async ({ objectId, concluida }) => {
  const response = await instance.put(
    `/Tarefa/${objectId}`,
    { concluida },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("put - response.status", response.status);
  console.log("put - response.data", response.data);
  return response.status;
};
