import Link from "next/link"
import Menu from "./Menu"



export default function Pagina(props:any){
    return(
        <>
        <div>
            <main>{props.children}</main>
        </div>
        </>
    )
}