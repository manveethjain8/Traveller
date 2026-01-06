import axios from "axios"

const fastAPI_client = axios.create({
    baseURL: "http://localhost:8001/api/v1"
})

interface EmbeddingResponse {
    embedding: number[]
}

export const getEmbedding = async(text: string): Promise<number[]> => {
    try{
        const response = await fastAPI_client.post<EmbeddingResponse>("/embed", {text})
        return response.data.embedding
    }catch(err){
        console.error("Embedding creation failed", err)
        return []
    }
}