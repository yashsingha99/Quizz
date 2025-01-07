import axios from "axios";
const URL = process.env.REACT_APP_URI;
export const addCandidate = async (data) => {
  try {
    let res = await axios.post(`${URL}/addStudent`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCandidate = async (data) => {
  try {
    let res = await axios.post(`${URL}/getStudent`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateScore = async (data) => {
  try {
    let res = await axios.post(`${URL}/updateScore`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
