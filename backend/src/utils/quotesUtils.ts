import { Error_Interface, Quotes_Interface } from "../configs/types_and_interfaces";
import Quotes from "../models/quotes";

// Helper function for the function getQuotes in quotes controller
export const fetchQuotes = async(): Promise<Quotes_Interface | Error_Interface> => {
    try{
        const response = await Quotes.aggregate<Quotes_Interface>([{$sample: {size: 1}}])
        return response[0]
    }catch(err: unknown){
        if(err instanceof Error){
            return {message: 'Error fetching quotes', error: err.message, location: 'Quotes Utils'}
        }else{
            return {message: 'Unknown error has occured', error: err, location: 'Quotes Utils'}
        }
    }
}