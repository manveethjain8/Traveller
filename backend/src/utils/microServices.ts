import axios from "axios"

const ml_client = axios.create({
    baseURL: "http://localhost:8001"
})

interface EmbeddingResponse {
    embedding: number[]
}

export const getEmbedding = async(text: string): Promise<number[]> => {
    try{
        const response = await ml_client.post<EmbeddingResponse>("/embed", {text})
        return response.data.embedding
    }catch(err){
        console.error("Embedding creation failed", err)
        return []
    }
}