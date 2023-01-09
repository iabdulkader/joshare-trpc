export default function ButtonWithIcon ({ 
    children, 
    loading = false, 
    }: { 
        children: React.ReactNode, 
        loading?: boolean, 
    }){
    

    return (
        <>
        {
            loading ?
            (
                <svg xmlSpace="preserve" width="16" height="14">
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
            ) : 
            children
        }
        
        </>
    )
}