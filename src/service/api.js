export const API_END_POINT = "https://pokeapi.co/api/v2/";
export const IMG_END_POINT =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/";
export const IMG_ERROR_END_POINT =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

// API 요청을 보내는 함수
export const request = async (url, options = {}) => {
  try {
    const fullUrl = `${API_END_POINT}${url}`;
    const response = await fetch(fullUrl, options);

    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error("API 통신 실패");
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(new Error("API 통신 실패"));
    });
  }
};

// 포켓몬 리스트를 가져오는 함수
export const getPokeList = async (offset = 0, limit = 30) => {
  return request(`pokemon?offset=${offset}&limit=${limit}`);
};

// 포켓몬 종 정보를 가져오는 함수
export const getPokemoSpecies = async (poketmonId) => {
  return request(`pokemon-species/${poketmonId}`);
};

// 포켓몬 정보를 가져오는 함수
export const getPokemonInfo = async (poketmonId) => {
  return request(`pokemon/${poketmonId}`);
};

// 네트워크 상태를 확인하는 함수
export const getNetwork = async (isResolve) => {
  return new Promise((resolve, reject) => {
    if (isResolve) {
      resolve("success");
    } else {
      reject(new Error("this is error"));
    }
  });
};
