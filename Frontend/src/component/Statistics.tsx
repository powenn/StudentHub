import { StatisticsDictProps } from "../interface/StatisticsProps"
import { StudentProps } from "../interface/StudentProps";

export default function Statistics(stdntData: StudentProps) {
    const data = stdntData ? stdntData.data : [];

    let st_department_map: Map<string, number> = new Map();

    data.forEach((student) => {
        if (st_department_map.has(student.department)) {
            st_department_map.set(student.department, st_department_map.get(student.department)! + 1);
        } else {
            st_department_map.set(student.department, 1);
        }
    });

    return (
        <div className="statistics">
            <ST_Department dictData={st_department_map}></ST_Department>
        </div>
    );
}

function ST_Department(st_map: StatisticsDictProps) {
    return (
        <div className="">
            <h3>各系人數</h3>
            {
                Array.from(st_map.dictData.entries()).map(([department, count], index) => (
                    <p key={index}>
                        {department}: {`${count}`} 人
                    </p>
                ))
            }
        </div>
    )
}