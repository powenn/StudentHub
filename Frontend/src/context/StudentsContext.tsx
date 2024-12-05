import { createContext, useState, ReactNode } from "react";
import { Student } from "../interface/Student";

interface StudentsContextType {
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

export const StudentsContext = createContext<StudentsContextType>({
    students: [],
    setStudents: () => [],
});

export const StudentsProvider = ({ children }: { children: ReactNode }) => {
    const [students, setStudents] = useState<Student[]>([]);

    return (
        <StudentsContext.Provider value={{ students, setStudents }}>
            {children}
        </StudentsContext.Provider>
    );
};
