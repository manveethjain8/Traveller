import { Response, Request} from "express"
import { Error_Interface, Quotes_Interface } from "../configs/types_and_interfaces"
import { fetchQuotes } from "../utils/quotesUtils"

// Function to get Quotes from database
export const getQuotes = async(req: Request, res: Response): Promise<any> => {
    try{
        const quote: Quotes_Interface | Error_Interface = await fetchQuotes()

        if('error' in quote){
            return res.status(400).json({message: quote.message, location: quote.location})
        }

        res.status(200).json(quote)
    }catch(err: unknown){
        if(err instanceof Error){
            res.status(500).json({message: 'Error retrieving quotes', error: err.message})
        }else{
            res.status(500).json({message: 'Unknown Error while retrieving quotes'})
        }
    }
}