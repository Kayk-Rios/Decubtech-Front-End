 



export default function Pagina(props:any){
    return(
        <>
        <div className=" sm:flex flex-col md:block">
            <main>{props.children}</main>
        </div>
        </>
    )
}