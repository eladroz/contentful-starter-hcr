
import { getPage, getAllPageSlugs } from '../api/cf';
import { getComponent } from '../src/components';
import * as React from 'react';

const Page = (props) => {
    React.useEffect(() => {
        const handler = (e) => {
            console.log(e.detail);
            //window.location.reload(); // user wants to implement own reload mechanism here
        };
        window.addEventListener('stackbitObjectsChanged', handler);
  
        return () => {
          window.removeEventListener('stackbitObjectsChanged', handler);
        };
    }, []);

    const ActualPage = getComponent('Page');
    return <ActualPage {...props} />;
}
export default Page;

export async function getStaticPaths() {
    const slugs = await getAllPageSlugs();

    const paths = slugs.map((slug) => ({
        params: {
            slug,
        },
    }));

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const page = await getPage(params.slug);

    return {
        props: {
            page,
        },
    };
}
