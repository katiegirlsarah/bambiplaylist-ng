export async function load({ params }) {
  let data = await fetch('http://localhost:3000/files')
  data = await data.text()
  
  return { "files": data }
}
