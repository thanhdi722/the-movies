				import axios, { AxiosResponse } from 'axios';

interface MovieResponse {
	data: any; // Ideally, you should replace 'any' with the actual type of the data
}

export const getMovies = async (page: number): Promise<MovieResponse> => {
	try {
		const response: AxiosResponse<MovieResponse> = await axios.get(`https://phimapi.com/danh-sach/phim-moi-cap-nhat`, {
			params: { page },
		});
		return response.data;
	} catch (error: any) {
		console.error('Error fetching movies:', error.response?.data || error.message);
		throw error;
	}
};
