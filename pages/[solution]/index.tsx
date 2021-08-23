import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { getTaggedMarkdownData } from '../../lib/getMarkdownData';
import ReactMarkdown from 'react-markdown';
import { Tags } from '../../interfaces/tags'
import { MarkdownAsset } from '../../interfaces/markdownAsset'

export async function getStaticProps() {
    let tags: Tags = {
        solution: 'devops'
    }
    const devOpsFiles = await getTaggedMarkdownData(tags);

    return {
        props: {
            devOpsFiles,
        },
    };
}

export default function DevOps({ devOpsFiles }: { devOpsFiles: MarkdownAsset[] }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>DevOps</title>
                <meta name="description" content="Scale management and delivery of media and static assets" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>DevOps 🎁</h1>

                <div className={styles.grid}>

                    {devOpsFiles.map(file => (
                        <div id={file.id} className={styles.socialsCard}>
                            <ReactMarkdown>{file.markdown}</ReactMarkdown>
                        </div>
                    ))}

                </div>

            </main>
        </div>
    );
}
