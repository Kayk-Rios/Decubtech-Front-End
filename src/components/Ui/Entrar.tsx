

interface EntrarProps {
    destino: string;
}
export default function ComponentName(props : EntrarProps){
    return(  
        <>
         <button className="entrar rounded-3xl  " >{props.destino}</button>
        </>
    )
}