// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    try {
      const result = await fetch("https://jsonplaceholder.typicode.com/posts/" + req.query.id)
      const data = await result.json()
      // console.log("data post id",data)
      res.status(200).json({ data, status: "status detail sukses" })

    } catch (err) {

      res.status(500).json({ error: 'failed to load data' })
    }
  }