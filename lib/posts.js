import fs from "fs";
import matter from 'gray-matter';
import path from 'path';
import remark from "remark";
import html from 'remark-html';

const postsDirectory = path.join( process.cwd(), 'posts' );

export function getSortedPostsData () {
  //get file names under  /posts
  const fileNames = fs.readdirSync( postsDirectory );
  const allPostsData = fileNames.map( fileName => {
    const id = fileName.replace( /\.md/, '' );

    //read markdown file 
    const fullPath = path.join( postsDirectory, fileName );
    const fileContents = fs.readFileSync( fullPath, 'utf-8' );

    //use gray-matter to pas the post metadata section
    const matterResult = matter( fileContents );

    return {
      id,
      ...matterResult.data
    }
  } )
  //dort the posts by date
  return allPostsData.sort( ( a, b ) => {
    if ( a.date < b.date )
    {
      return 1
    } else
    {
      return -1
    }
  } )
}

//return a list of filenames excluding there extentions

export function getAllPostIds () {
  const fileNames = fs.readdirSync( postsDirectory );

  return fileNames.map( fileName => {
    return {
      params: {
        id: fileName.replace( /\.md$/, '' )
      }
    }
  } )
}

//fetch the neccessary data to render the post with the given id

export async function getPostData ( id ) {
  const fullPath = path.join( postsDirectory, `${ id }.md` );
  const fileContents = fs.readFileSync( fullPath, 'utf8' )

  const matterResult = matter( fileContents );

  //use remark to convert markdown into html string
  const processedContent = await remark()
    .use( html )
    .process( matterResult.content );
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}