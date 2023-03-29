import { writeAttendance } from "../../../prisma/attendance";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const data = req.body
            const { attendance, error } = await writeAttendance(data)
            if (error) throw new Error(error)
            return res.status(200).json({ attendance })
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    res.setHeader('Allow', ['GET', 'POST'])
    res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler