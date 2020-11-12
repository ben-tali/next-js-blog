import fs from "fs";
import matter from 'gray-matter';
import path from 'path';

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