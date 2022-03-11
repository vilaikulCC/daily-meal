import { createContext, useState } from "react";

export const DataContext = createContext()

const DataContextProvider = ({children}) => {
    const [item, setItem] = useState([])

    const addItem = (data) => {
        setItem([...item,data])
    }


    console.log("All item = ",item)
    
    return (
        <DataContext.Provider value={{item: item, addItem}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider