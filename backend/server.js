import app from "./src/app.js"

const port = process.env.Port || 4000

app.listen(port, () => {
    console.log(`servidor ouvindo em http://localhost:${port}`)
})
