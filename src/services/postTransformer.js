const postTransformer = {
    fromWorpressList(posts) {
        return posts.map(post => this.fromWordpress(post));
    },

    fromWordpress(post) {
        return {
            documentId: post.ID,
            title: post.title,
            content: post.content,
            excerpt: post.excerpt,
            createdAt: post.date,
            updatedAt: post.modified,
            categories: post.categories ? Object.keys(post.categories) : [],
            tags: post.tags ? Object.keys(post.tags) : [],
            author: post.author ? {
                id: post.author.ID,
                name: post.author.name,
                niceName: post.author.nice_name,
                URL: post.author.URL,
                avatarURL: post.author.avatar_URL,
            } : null,
            img_url: post.featured_image,
            url: post.URL,
        };
    },
};

export default postTransformer;
