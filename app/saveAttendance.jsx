import { useMhsClass } from "./contexts/globalContext";

export default function SaveAttendance(){
    const { state } = useMhsClass();
    // console.log(state.mhsStudentsPresent)

    const handleSave = () => {
        const reqOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state.attendance)
        };
        fetch("http://localhost:3000/api/attendance", reqOptions)
            .then(res => res.json())
            //.then(res => console.log(res));
    };

    return (
        <button type="submit" onClick={handleSave}>
            Save Attendance
          </button>
    )
}