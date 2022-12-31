import { async } from "regenerator-runtime";

export const getJSON = async function (url) {
  try {
    
    // const res = await fetch(`${API_URL}/${id}`);
    const res = await fetch(url);
    const data = await res.json();
    
    if (!res.ok) throw new Error(`${data.message} (${res.status})`)

    return data;
  } catch (err) {
    console.log('err: ', err);
  }
}