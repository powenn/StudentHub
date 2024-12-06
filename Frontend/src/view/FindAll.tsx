import { useContext, useState, useRef, useEffect } from "react";
import Navbar from "../component/NavBar";
import Statistics from "../component/Statistics";
import { StudentsContext } from "../context/StudentsContext";
import { api } from "../enum/api";
import { resp } from "../interface/resp";
import { Student } from "../interface/Student";
import { asyncGet } from "../utils/fetch";

export default function FindAll() {
    const { students, setStudents } = useContext(StudentsContext);
    const [searchName, setSearchName] = useState<string>('');
    const [searchAbsences, setSearchAbsences] = useState<number | undefined>(undefined);
    const cache = useRef<boolean>(false);
  
    useEffect(() => {
      if (!cache.current) {
        cache.current = true;
        asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
          if (res.code === 200) {
            setStudents(res.body);
          }
        });
      }
    }, []);
  
    const filteredStudents = students.filter((student) => {
      const nameMatches = searchName ? student.name.includes(searchName) : true;
      const absencesMatches =
        searchAbsences !== undefined ? (student.absences === searchAbsences || student.absences === undefined && searchAbsences === 0) : true;
  
      return nameMatches && absencesMatches;
    });
  
    const studentList = filteredStudents.length > 0 ? (
      filteredStudents.map((student: Student) => (
        <div className="student" key={student._id}>
          <p>帳號: {student.userName}</p>
          <p>座號: {student.sid}</p>
          <p>姓名: {student.name}</p>
          <p>院系: {student.department}</p>
          <p>年級: {student.grade}</p>
          <p>班級: {student.class}</p>
          <p>Email: {student.Email}</p>
          <p>缺席次數: {student.absences ? student.absences : 0}</p>
        </div>
      ))
    ) : (
      <div className="no-match-msg">沒有符合條件的學生</div>
    );
  
    return (
      <div className="container">
        <Navbar></Navbar>
        <div className="search-bar">
          <input
            type="text"
            placeholder="搜尋姓名..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="number"
            placeholder="搜尋缺席次數..."
            value={searchAbsences !== undefined ? searchAbsences : ''}
            onChange={(e) =>
              setSearchAbsences(e.target.value !== '' ? parseInt(e.target.value) : undefined)
            }
          />
        </div>
        <div className="student-list-wrapper">{studentList}</div>
        <Statistics data={filteredStudents}></Statistics>
      </div>
    );
  }