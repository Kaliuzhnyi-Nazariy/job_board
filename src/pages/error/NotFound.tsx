import {useNavigate} from "redux-router"

const NotFound = () => {
const navigate = useNavigate();
return <div className="w-full h-screen grid justify-self-center">
<h1>Page not found!</h1>
<button type="button" onClick={()=> navigate("/")} className="w-60">Go home</button>
</div>
}

export default NotFound