import Head from 'next/head';
import Date from '../../components/date';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
//create getStatic paths which to get all possible paths

export async function getStaticPaths () {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

//create getStaticProps which gets posts data using for an individual id
export async function getStaticProps ( { params } ) {
  const postData = await getPostData( params.id )

  return {
    props: {
      postData
    }
  }
}

export default function Post ( { postData } ) {
  return (
    <Layout>
      <Head>
        <title>{ postData.title }</title>
      </Head>
      <article>
        <h1 className={ utilStyles.headingX1 }>
          { postData.title }
        </h1>
        <div className={ utilStyles.lightText }>
          <Date datestring={ postData.date } />
        </div>

        <div dangerouslySetInnerHTML={ { __html: postData.contentHtml } }></div>
      </article>
    </Layout>
  )
}
