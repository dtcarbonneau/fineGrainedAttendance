'use client'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import {
  LoginButton, SaveAttendanceButton,
  DatePickerButton, StartEndClassButton, ReportAttendanceButton } from './ControlButtons';
import { AppContainer, NavBarStyle } from './StyledComponents'
import { useSession } from "next-auth/react";
import MhsClassList from './MhsClassList';
import StudentList from './StudentList';
import AttendanceViz from './ReportGrid'
import { useMhsClass } from './contexts/globalContext';

//const inter = Inter({ subsets: ['latin'] })
export default function Page() {
  const { data: session } = useSession();
  const { state } = useMhsClass();
  return (<AppContainer>
    <NavBarStyle>
      <LoginButton />
    </NavBarStyle>
    {session ?
      (state.display === "mhsClasses" ? <MhsClassList /> : <StudentList />) : ""}
    {state.attendanceReport.length > 0 ? <AttendanceViz /> : ''}
    <div style={{ display:"flex", gridarea:"nav" }}>
      {state.mhsClassIndex ? <StartEndClassButton /> : ""}
      {state.attendance.length > 0 && state.display === "mhsClasses" ? <SaveAttendanceButton /> : ""}
      {state.display === "mhsClasses" && state.mhsClassIndex ? < DatePickerButton /> : ""}
      {state.display === "mhsClasses" && state.mhsClassIndex ? <ReportAttendanceButton />: ""}
    </div>
  </AppContainer>)
}
