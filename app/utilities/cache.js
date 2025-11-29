import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const DEFAULT_EXPIRATION_IN_MINUTES = 60;

const store = async (key, value) => {
  try {
    console.log(" Cache: Salvando chave", key);

    const item = {
      value,
      timestamp: dayjs().valueOf(),
    };

    await AsyncStorage.setItem(key, JSON.stringify(item));

    console.log(" Cache salvo com sucesso!");
  } catch (error) {
    console.log(" Erro ao salvar no cache!", error);
  }
};

const isExpired = (item, expiresIn = DEFAULT_EXPIRATION_IN_MINUTES) => {
  const now = dayjs();
  const itemTime = dayjs(item.timestamp);
  const diff = now.diff(itemTime, "minute");

  console.log(` Cache idade: ${diff} minutos`);

  return diff > expiresIn;
};

const get = async (key, expiresIn = DEFAULT_EXPIRATION_IN_MINUTES) => {
  try {
    console.log(" Cache: buscando chave", key);

    const value = await AsyncStorage.getItem(key);
    if (!value) {
      console.log(" Cache vazio.");
      return null;
    }

    const item = JSON.parse(value);

    if (isExpired(item, expiresIn)) {
      console.log(" Cache expirado! Removendo...");
      await AsyncStorage.removeItem(key);
      return null;
    }

    console.log(" Cache recuperado!");
    return item.value;
  } catch (error) {
    console.log(" Erro ao ler cache", error);
    return null;
  }
};

export default {
  store,
  get,
  isExpired,
};
