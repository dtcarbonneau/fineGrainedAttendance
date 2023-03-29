// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

async function getData(access_token) {
  const res = await fetch('https://classroom.googleapis.com/v1/courses',{
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  })
  if (!res.ok) {
    throw new Error("Failed to Fetch")
  }

  const res_json = await res.json()
  //var res_filter = JSON.parse(res);
  const results = res_json.courses.filter(course => course.courseState === 'ACTIVE')
    .map(course => {
      return {
      'id': course.id, 'name': course.name
    }
  })

  return results
}


export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const data = await getData(session.user.token)
  //console.log(data)

  //console.log(data)
  return res.status(200).json({data})
}
