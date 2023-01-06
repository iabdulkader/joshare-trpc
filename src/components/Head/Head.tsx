import Head from 'next/head'
import useTheme from '../../hooks/useTheme';

export default function MetaHead({ title }: { title?: string}) {
    const { activeTheme } = useTheme();

    return (<Head>
                <title>{title}</title>
                <meta name="description" content="JoShare is a simple file sharing app." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />      
            </Head>)
}