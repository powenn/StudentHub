import { useContext, useState } from 'react';
import Navbar from '../component/NavBar';
import { asyncGet, asyncPost } from '../utils/fetch';
import { api } from '../enum/api';
import { resp } from '../interface/resp';
import '../style/InsertForm.css';
import '../style/ResponseDisplay.css'
import ResponseDisplay from '../component/ResponseDisplay';
import { StudentsContext } from '../context/StudentsContext';

export default function InsertOne() {
  const { students, setStudents } = useContext(StudentsContext);
  const [newStudent, setNewStudent] = useState({
    userName: '',
    name: '',
    department: '',
    grade: '',
    class: '',
    Email: '',
  });

  const [response, setResponse] = useState<resp<string> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: name === 'absences' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await asyncPost(api.insertOne, newStudent);
    setResponse(response);

    if (response.code === 200) {
      alert('學生新增成功');
      // setNewStudent({
      //   userName: '',
      //   name: '',
      //   department: '',
      //   grade: '',
      //   class: '',
      //   Email: '',
      // });
      const res = await asyncGet(api.findAll);
      if (res.code === 200) {
        setStudents(res.body);
      }
    } else {
      alert('新增失敗');
    }
  };

  return (
    <div className="container">
      <Navbar></Navbar>
      <div className="insert-form">
        <h2>新增學生</h2>
        <form onSubmit={handleSubmit}>
          <input name="userName" placeholder="帳號" value={newStudent.userName} onChange={handleChange} />
          <input name="name" placeholder="姓名" value={newStudent.name} onChange={handleChange} />
          <input name="department" placeholder="院系" value={newStudent.department} onChange={handleChange} />
          <input name="grade" placeholder="年級" value={newStudent.grade} onChange={handleChange} />
          <input name="class" placeholder="班級" value={newStudent.class} onChange={handleChange} />
          <input name="Email" placeholder="Email" value={newStudent.Email} onChange={handleChange} />
          <input
            type="number"
            name="absences"
            placeholder="缺席次數"
            onChange={handleChange}
          />
          <button type="submit">新增</button>
        </form>
      </div>
      {response && <ResponseDisplay response={response} />}
    </div>
  );
}



/*
{
    "userName": "tkuim8763",
    "name": "蕭博文",
    "department": "資訊管理學系",
    "grade": "3",
    "class":"3C",
    "Email": "411630758@o365.tku.edu.tw"
}

*/