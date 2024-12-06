import { useContext, useState } from "react";
import Navbar from "../component/NavBar";
import { StudentsContext } from "../context/StudentsContext";
import { api } from "../enum/api";
import { resp } from "../interface/resp";
import { Student } from "../interface/Student";
import { asyncDelete, asyncGet } from "../utils/fetch";
import ResponseDisplay from "../component/ResponseDisplay";
import '../style/SearchBar.css'

export default function DeleteStudent() {


    const { students, setStudents } = useContext(StudentsContext);
    const [searchSid, setSearchSid] = useState<string>("");
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [response, setResponse] = useState<resp<string> | null>(null);


    const handleSearch = () => {
        const student = students.find((s) => s.sid === searchSid);
        setSelectedStudent(student || null);
    };


    const handleDelete = async () => {
        if (selectedStudent) {
            const confirmDelete = window.confirm(`確定刪除學生 ${selectedStudent.userName} ${selectedStudent.name} : ${selectedStudent.sid} 嗎？`);
            if (!confirmDelete) return;
            const response = await asyncDelete(`${api.deleteByID}?id=${selectedStudent._id}`, {})
            setResponse(response)
            if (response.code === 200) {
                alert('已刪除');
                const res = await asyncGet(api.findAll);
                if (res.code === 200) {
                    setStudents(res.body);
                }
            } else {
                alert('刪除失敗')
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
                <h2>刪除學生</h2>
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
                    <div className="insert-form disabled">
                        <input type="text" value={selectedStudent.userName} readOnly/>
                        <input type="text" value={selectedStudent.sid} readOnly/>
                        <input type="text" value={selectedStudent.name} readOnly/>
                        <input type="text" value={selectedStudent.department} readOnly/>
                        <input type="text" value={selectedStudent.grade} readOnly/>
                        <input type="text" value={selectedStudent.class} readOnly/>
                        <input type="email" value={selectedStudent.Email} readOnly/>
                        <input type="number" value={selectedStudent.absences || 0} readOnly/>
                        <button onClick={handleDelete}>刪除</button>
                    </div>
                ) : (
                    <p className="no-student">沒有符合的學生</p>
                )}
            </div>
            {response && <ResponseDisplay response={response} />}
        </div>
    )
}