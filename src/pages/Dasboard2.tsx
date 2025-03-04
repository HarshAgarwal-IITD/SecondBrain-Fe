import { useParams } from "react-router-dom";

export default function Dashboard2(){
    const { link } = useParams<{ link: string }>();
    return <h1>{link}</h1>
}