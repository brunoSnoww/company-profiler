import { createContext, useContext, useState } from 'react';
import type { Model } from '../types/types';

interface ModelContextType {
    model: Model;
    setModel: (model: Model) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const ModelProvider = ({ children }: { children: React.ReactNode }) => {
    const [model, setModel] = useState<Model>('openai');

    return (
        <ModelContext.Provider value={{ model, setModel }}>
            {children}
        </ModelContext.Provider>
    );
};

export const useModel = () => {
    const context = useContext(ModelContext);
    if (context === undefined) {
        throw new Error('useModel must be used within a ModelProvider');
    }
    return context;
};