//import { useMhsClass } from './contexts/globalContext'
import prisma from '../lib/prismadb'

export async function writeAttendance(attendance) {
    try {
        const attendanceFromDB = await prisma.Attendance.createMany({ data: attendance})
        return { data: attendanceFromDB }
    } catch (error) {
        return {error}
    }
}
