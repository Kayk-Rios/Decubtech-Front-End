

interface EntrarProps {
    destino: string;
    className?: string;
}
export default function ComponentName(props : EntrarProps){
    return(  
        <>
         <button className={`  rounded-3xl w-[300px] ${props.className}  `} >{props.destino}</button>
        </>
    )
}