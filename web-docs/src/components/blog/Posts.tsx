import { getPosts } from '@/app/utils/utils';
import { Grid } from '@/once-ui/components';
import Post from './Post';

interface PostsProps {
    range?: [number] | [number, number];
    columns?: '1' | '2' | '3';
    locale: string;
    thumbnail?: boolean;
}

export function Posts({
    range,
    columns = '1',
    locale = 'en',
    thumbnail = false
}: PostsProps) {
    let allBlogs = getPosts(['src', 'app', '[locale]', 'docs', 'posts', locale]);

    // const sortedBlogs = allBlogs.sort((a, b) => {
    //     return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    // });

    // const displayedBlogs = range
    //     ? sortedBlogs.slice(
    //         range[0] - 1,
    //         range.length === 2 ? range[1] : sortedBlogs.length
    //     )
    //     : sortedBlogs;

    return (
        <>
            {allBlogs.length > 0 && (
                <Grid
                    columns={`repeat(${2}, 1fr)`} mobileColumns="1col"
                    fillWidth marginBottom="40" gap="m">
                    {/* {allBlogs.map((post) => (
                        <Post
                            key={post.slug}
                            post={post}
                            thumbnail={thumbnail}
                        />
                    ))} */}
                    <Post
                        key={allBlogs[1].slug}
                        post={allBlogs[1]}
                        thumbnail={thumbnail}
                    />
                    <Post
                        key={allBlogs[0].slug}
                        post={allBlogs[0]}
                        thumbnail={thumbnail}
                    />
                </Grid>
            )}
        </>
    );
}