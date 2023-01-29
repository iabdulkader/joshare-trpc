import Head from 'next/head'
import { useEffect } from 'react';
import useTheme from '../../hooks/useTheme';

export default function MetaHead({ title }: { title?: string}) {
    
    return (<Head>
                <title>{title}</title>
                <meta name="description" content="JoShare - A complete file sharing solution. Share files with others very easily." /> 
                <meta name="viewport" content="width=device-width, initial-scale=1" /> 
                <meta property="og:image" content="/joshare.png" />

                <meta property="og:description" content="JoShare - A complete file sharing solution. Share files with others very easily." />

                <meta property="og:url" content="https://joshare.xyz" />

                <meta property="og:title" content={`${title}`} />   
            </Head>)
}