import Head from 'next/head'
import { useEffect } from 'react';
import useTheme from '../../hooks/useTheme';

export default function MetaHead({ title }: { title?: string}) {
    
    return (<Head>
                <title>{title}</title>
                <meta name="description" content="JoShare is a simple file sharing app." />
                <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> 
                <meta name="viewport" content="width=device-width, initial-scale=1" />    
            </Head>)
}