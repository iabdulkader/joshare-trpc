export default function Button({ 
    text,
    onClick, 
    loading = false, 
    height, 
    width ,
    type = "button",
   } : { 
    text: string, 
    onClick?: () => void, 
    loading?: boolean, 
    height?: number, 
    width?: number ,
    type?: "submit" | "button" | "reset",
   }) {

    let widthStyle = {
        width: `${width! / 4}rem`
    };


    return (
        <button 
          type={type}
          style={widthStyle}
          onClick={onClick}
          disabled={loading}
          className={`button group flex justify-center items-center h-${height!}`}
        >
          {loading ? 
          (
            <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="24" height="22">
                <path className="fill-slate-900 group-hover:fill-slate-50 dark:fill-slate-50 dark:group-hover:fill-slate-900" d="M0 0h2v8H0z">
                    <animateTransform attributeName="transform" attributeType="xml" begin="0" dur="0.6s" repeatCount="indefinite" type="translate" values="0 0; 0 15; 0 0"/>
                </path>
                <path className="fill-slate-900 group-hover:fill-slate-50 dark:fill-slate-50 dark:group-hover:fill-slate-900" d="M10 0h2v8h-2z">
                    <animateTransform attributeName="transform" attributeType="xml" begin="0.2s" dur="0.6s" repeatCount="indefinite" type="translate" values="0 0; 0 15; 0 0"/>
                </path>
                <path className="fill-slate-900 group-hover:fill-slate-50 dark:fill-slate-50 dark:group-hover:fill-slate-900" d="M20 0h2v8h-2z">
                    <animateTransform attributeName="transform" attributeType="xml" begin="0.4s" dur="0.6s" repeatCount="indefinite" type="translate" values="0 0; 0 15; 0 0"/>
                </path>
            </svg>
          )
          : text}
        </button>
    )
}
