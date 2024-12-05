import { model, Schema } from "mongoose";
import { Student } from "../../interfaces/Student";

export const studentsSchemas = new Schema<Student>({
    userName:{ type: String, required: true },
    sid:{ type: String, required: true },
    name:{ type: String, required: true },
    department:{ type: String, required: true },
    grade:{ type: String, required: true },
    class:{ type: String, required: true },
    Email:{ type: String, required: true },
    absences:{ type: Number, required: false },
});

export const studentsModel = model<Student>('students', studentsSchemas);
