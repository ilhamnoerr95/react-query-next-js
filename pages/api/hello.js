// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
 
  try {
    const result = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${req.query.page}`)
    const data = await result.json()
    res.status(200).json({ data, status: "bisa" })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}