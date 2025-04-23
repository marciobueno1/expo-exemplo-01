// import axios from "axios";

export const getTarefas = async () => {
  const response = await fetch("https://parseapi.back4app.com/classes/Tarefa", {
    headers: {
      "X-Parse-Application-Id": "4cRNaPFAu9tGO59OrBIJpH4v6qeHUUbtReuVmjP7",
      "X-Parse-Client-Key": "tGuNs9tDkrSX2APoRwnbSAiXhOGBuMqsgrq0ZWXJ",
    },
  });
  return await response.json();
};
