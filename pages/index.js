import { useEffect, useState } from 'react'
import Head from 'next/head'
import clientPromise from '../lib/mongodb'

export default function Home({ isConnected }) {
  const [mytitle, setTitle] = useState([])

  useEffect(() => {
    (async () => {
      const results = await fetch("api/list");
      const resultsJson = await results.json();
      setTitle(resultsJson);
  })();
  }, []);

  return (
    <div className="container">

      <Head>
        <title>ProgrammingHead - Programming Tutorials for Beginners</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to Programminghead.com
        </h1>

        <div>
        {mytitle && mytitle.map(theTitle => {
          let postCount =0;
          return(
            <div key={theTitle._id}>
              <button >{theTitle.title}</button>

              {theTitle.postdata && theTitle.postdata.map(postidata => (
                  <b key={++postCount}>{postidata.data}</b>
                ))
              }
            </div>
          );
        })}
        </div>

        
      </main>
      <footer>
      </footer>

      
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}
