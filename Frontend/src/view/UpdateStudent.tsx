import { useContext, useState } from "react";
import { StudentsContext } from "../context/StudentsContext";
import { Student } from "../interface/Student";
import Navbar from "../component/NavBar";
import { asyncGet, asyncPut } from "../utils/fetch";
import { api } from "../enum/api";
import { resp } from "../interface/resp";
import ResponseDisplay from "../component/ResponseDisplay";

export default function UpdateStudent() {
    const { students, setStudents } = useContext(StudentsContext);
    const [searchSid, setSearchSid] = useState<string>("");
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [response, setResponse] = useState<resp<string> | null>(null);

    const handleSearch = () => {
        const student = students.find((s) => s.sid === searchSid);
        setSelectedStudent(student || null);
    };

    const handleUpdate = (field: keyof Student, value: string | number) => {
        if (selectedStudent) {
            setSelectedStudent({ ...selectedStudent, [field]: value });
        }
    };

    const handleSave = async () => {
        if (selectedStudent) {
            const response = await asyncPut(`${api.updateNameByID}?id=${selectedStudent._id}`, selectedStudent)
            setResponse(response)
            if (response.code === 200) {
                alert('更新成功');
                const res = await asyncGet(api.findAll);
                if (res.code === 200) {
                    setStudents(res.body);
                    const updatedStudent = res.body.find((s: Student) => s.sid === selectedStudent.sid);
                    setSelectedStudent(updatedStudent || null);
                }
            } else {
                alert('更新失敗')
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="container">
            <Navbar></Navbar>
            <div>
                <h2>更新學生資料</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="輸入座號查詢"
                        value={searchSid}
                        onChange={(e) => setSearchSid(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button onClick={handleSearch}>搜尋</button>
                </div>

                {selectedStudent ? (
                    <div className="insert-form">
                        <input
                            type="text"
                            value={selectedStudent.userName}
                            onChange={(e) => handleUpdate("userName", e.target.value)}
                        />
                        <input
                            type="text"
                            value={selectedStudent.sid}
                            onChange={(e) => handleUpdate("sid", e.target.value)}
                        />
                        <input
                            type="text"
                            value={selectedStudent.name}
                            onChange={(e) => handleUpdate("name", e.target.value)}
                        />
                        <input
                            type="text"
                            value={selectedStudent.department}
                            onChange={(e) => handleUpdate("department", e.target.value)}
                        />
                        <input
                            type="text"
                            value={selectedStudent.grade}
                            onChange={(e) => handleUpdate("grade", e.target.value)}
                        />
                        <input
                            type="text"
                            value={selectedStudent.class}
                            onChange={(e) => handleUpdate("class", e.target.value)}
                        />
                        <input
                            type="email"
                            value={selectedStudent.Email}
                            onChange={(e) => handleUpdate("Email", e.target.value)}
                        />
                        <input
                            type="number"
                            value={selectedStudent.absences || 0}
                            onChange={(e) => handleUpdate("absences", parseInt(e.target.value))}
                        />
                        <button onClick={handleSave}>提交更新</button>
                    </div>
                ) : (
                    <p className="no-student">沒有符合的學生</p>
                )}
            </div>
            {(selectedStudent && response) && <ResponseDisplay response={response} />}
        </div>
    );
}
