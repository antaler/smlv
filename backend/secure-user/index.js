import express, { Router } from "express"

const PORT = 8080


const app = express();
app.get("/health-check", (req, res) => res.json({ status: "OK" }));


const router = Router();

router.post("/callback", (req, res) => {

});

app.use( "/v1/user", router);

app.listen(PORT,()=> {
    console.log(`Server ready on ${PORT}`);
})