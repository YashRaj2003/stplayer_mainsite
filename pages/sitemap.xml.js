import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';


export async function getServerSideProps({ res }) {

    const q = query(collection(db, "video"));
    const video = await getDocs(q).then((snapshot) => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(video)

    // res.setHeader('Content-Type', 'text/xml')
    // we send the XML to the browser
    res.write(sitemap)
    res.end()

    return {
        props: {}
    }
}

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
       <loc>https://st-player.in</loc>
     </url>
     ${posts
            .map(({ id }) => {
                return `
       <url>
           <loc>${`https://st-player.in/video/${id}`}</loc>
       </url>
     `
            })
        }
   </urlset>
 `
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}



export default SiteMap