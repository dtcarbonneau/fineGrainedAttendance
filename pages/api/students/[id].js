// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

async function getData(access_token, courseId) {

  const res = await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/students`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  })
  if (!res.ok) {
    throw new Error("Failed to Fetch")
  }

  const res_json = await res.json()

  const results = res_json.students.map(student => {
    return {
      'courseId': student.courseId, 'userId': student.userId, 'email': student.profile.emailAddress,
      'firstName': student.profile.name.givenName, 'lastName': student.profile.name.familyName
    }
  })

  return results.sort((s1, s2)=>(s1.lastName > s2.lastName) ? 1 : (s1.lastName < s2.lastName) ? -1: 0 )
}

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  const { id } = req.query;

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const data = await getData(session.user.token, id)
  //console.log(data)

  //console.log(data)
  return res.status(200).json({data})
}
