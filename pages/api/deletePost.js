import Env from "Consts/env"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  
    try {
      const options = {
        method: 'GET',
        headers: Env.headers
      }
      const result = await fetch("https://jsonplaceholder.typicode.com/posts/" + req.query.id, options)
      const data = await result.json()
      res.status(200).json({ data, status: "200", msg: "data berhasil di delete" })

    } catch (err) {

      res.status(500).json({ error: 'failed to load data' })
    }
  }