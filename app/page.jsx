'use client'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import LoginBtn from './login-btn'
import { AppContainer } from './AppContainer'
import { useSession } from "next-auth/react";
import MhsClassList from './MhsClassList';
import StudentList from './StudentList'
import { MhsClassProvider } from './contexts/globalContext'
import SaveAttendance from './saveAttendance';
import { useMhsClass } from './contexts/globalContext'

//const inter = Inter({ subsets: ['latin'] })
export default function Page() {
  const { data: session } = useSession();

  return (<MhsClassProvider><AppContainer>
    <LoginBtn  />
    {session ? <MhsClassList/>: ""}
    {/* <StudentList/> */}
    <SaveAttendance />
  </AppContainer></MhsClassProvider>)
}

//   <main className={styles.main}>
//      <h1>Hello next 13</h1>
//      <div>
//        <LoginBtn/>
//      </div>
//    </main>
//  )
//}
