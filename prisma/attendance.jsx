//import { useMhsClass } from './contexts/globalContext'
import prisma from '../lib/prismadb'

export async function writeAttendance(attendance) {
    try {
        const attendanceFromDB = await prisma.attendance.createMany({ data: attendance})
        return { data: attendanceFromDB }
    } catch (error) {
        return {error}
    }
}

export async function readAttendance(mhsClass) {
    // const result = await prisma.
    //     $queryRaw`SELECT student, json_object_agg(ddmm, total ORDER BY ddmm) attendance
	//         FROM (SELECT student, to_char(at_day, 'dd/mm') as ddmm, sum(seconds) as total
	// 	    FROM (SELECT student, (time_out-time_in) seconds, to_timestamp(time_in)::date as at_day,
	// 			time_in FROM attendance
	// 		   WHERE attendance.mhs_class = ${mhsClass} AND
	// 			time_in > 1680000000 AND
	// 			time_in < 1700000000
	// 		   ) sub
	// 	  GROUP BY student, at_day )sub2
	// 	  GROUP BY student
	// 	  ORDER BY student;`

    const result = await prisma.
        $queryRaw`with q1 as (
        select student,extract(MONTH from to_timestamp(time_class_start)) as "month",
        extract(DAY from to_timestamp(time_class_start)) as "day",
        extract(HOUR from to_timestamp(time_class_start)) as "hour",
        extract(MINUTE from to_timestamp(time_class_start)) as "minute",
        (time_class_end-time_class_start)/60 as "duration",
        json_agg((select row_to_json(_) from
        --the subqueries name the keys in the json
        (select (a.time_in-a.time_class_start)/60 as "in",
        (a.time_out-a.time_class_start)/60 as "out") as _)) as in_out_times
        from attendance as a
        where mhs_class = ${mhsClass}
        group by student,month,day,hour,minute, duration)
        --json_build_object names the keys in the json
        select student, json_agg(json_build_object('month', month,
		'day', day, 'hour', hour, 'minute', minute,
		'duration', duration, 'in_out_times',in_out_times)) as att_times from q1
		group by student`

    console.log(result);
    return result;
}
//     try {
//         const result = await prisma.$queryRaw`SELECT * FROM attendance WHERE student = ${student};`
//         console.log(result)
//         return result
//     } catch (error) {
//         return {error}
//     }
// }
