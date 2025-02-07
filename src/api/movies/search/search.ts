import axios from "axios";

export const getSearch = async (
  keyword: string,
  limit: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}&limit=${limit}`,
      {}
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching movies:",
      error.response?.data || error.message
    );
    throw error;
  }
};
