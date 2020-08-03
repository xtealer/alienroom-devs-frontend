import React, { useState, useEffect } from 'react';
import InstagramEmbed from 'react-instagram-embed';
import { Carousel } from 'react-bootstrap';

import fetchInstagramPhotos from '../helper/fetchInstagramPhotos';

const InstagramFrameComponent = (props) => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const response = await fetchInstagramPhotos('https://instagram.com/alienroom');
            setPosts(response.map((p) => p.url));
        } catch (e) {
            console.error('Fetching Instagram photos failed', e)
        }
    }

    useEffect(() => {
        if (posts.length === 0) {
            getPosts();
        }
    }, [posts]);

    return (<Carousel className="social-board">
        {posts.map((p) => {
            return (<Carousel.Item>
                <InstagramEmbed className="d-flex justify-content-center" url={p} maxWidth={400} />
            </Carousel.Item>);
        })}
    </Carousel>);
};

export default InstagramFrameComponent;