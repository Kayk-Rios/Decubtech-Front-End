

interface EntrarProps {
    destino: string;
}
export default function ComponentName(props : EntrarProps){
    return(  
        <>
         <button className="entrar rounded-3xl w-[300px] " >{props.destino}</button>
        </>
    )
}