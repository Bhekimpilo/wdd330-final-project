import axios from "axios";

const baseUrl = 'https://opentdb.com/api.php';

export async function getQuestions(size, level) {

    try {
        const questions = await axios.get(`${baseUrl}?amount=${size}&category=22&difficulty=${level}`);
        return questions.data;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }

}


