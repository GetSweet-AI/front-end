import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import FeedPostCard from '../../partials/FeedPostCard';
import noData from '../../images/NoData.svg';

const LazyLoadedFeedPosts = ({
    filteredFeedPosts,
    deletePostFeed,
    engagements,
    handleCopyText,
    downloadVideo,
    brandEngagementData,
    clientConnect,
    getClientConnectData,
    clientConnectData,
    isConnected
}) => {
    const [visiblePosts, setVisiblePosts] = useState([]);

    useEffect(() => {
        // Load initial batch of posts when component mounts
        loadVisiblePosts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // Reset visible posts whenever filteredFeedPosts changes
        setVisiblePosts([]);
    }, [filteredFeedPosts]);

    useEffect(() => {
        // Load visible posts when component mounts or filteredFeedPosts changes
        loadVisiblePosts();
    }, [filteredFeedPosts]);

    const loadVisiblePosts = () => {
        // Simulate loading the visible posts
        // You can implement actual lazy loading logic here, fetching data from an API or similar
        const startIndex = visiblePosts.length;
        const endIndex = startIndex + 10; // Load 10 posts at a time
        const postsToLoad = filteredFeedPosts.slice(startIndex, endIndex);

        setVisiblePosts(prevPosts => [...prevPosts, ...postsToLoad]);
    };

    const Row = ({ index, style }) => {
        const post = visiblePosts[index];

        return (
            <div key={post._id} className='  py-2' style={style}>
                <FeedPostCard
                    feedPostId={post._id}
                    id={post._id}
                    MediaUrl={post.MediaUrl}
                    deleteFeedPost={deletePostFeed}
                    Caption={post.Caption}
                    Date={post.Date}
                    handleCopyText={handleCopyText}
                    Accounts={post.Accounts}
                    DownloadButton={downloadVideo}
                    unixTimestamp={post.unixTimestamp}
                    BrandEngagementID={post.BrandEngagementID}
                    brandEngagementData={brandEngagementData}
                    clientConnect={clientConnect}
                    getClientConnectData={getClientConnectData}
                    clientConnectData={clientConnectData}
                    isConnected={isConnected}
                />
            </div>
        );
    };


    if (filteredFeedPosts.length === 1) {
        // Render single item differently
        const item = filteredFeedPosts[0];
        return (
            <FeedPostCard
                feedPostId={item._id}
                id={item._id}
                MediaUrl={item.MediaUrl}
                deleteFeedPost={deletePostFeed}
                Caption={item.Caption}
                Date={item.Date}
                handleCopyText={handleCopyText}
                Accounts={item.Accounts}
                DownloadButton={downloadVideo}
                unixTimestamp={item.unixTimestamp}
                BrandEngagementID={item.BrandEngagementID}
                brandEngagementData={brandEngagementData}
            />
        );
    }
    return (
        <div style={{ width: '100%' }}>
            <List
                height={800} // Specify the height of the list
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                    gap: '0.75rem',
                    margin: '4px'

                    /* Add any additional custom styles here */
                }}  // Add your custom styles here
                itemCount={visiblePosts.length} // Total number of visible posts
                itemSize={450} // Specify the height of each item
                width={'100%'} // Specify the width of the list as 100%
                onItemsRendered={({ visibleRowStartIndex, visibleRowStopIndex }) => {
                    // If the user scrolls to the end, load more posts
                    if (visibleRowStopIndex === visiblePosts.length - 1) {
                        loadVisiblePosts();
                    }
                }}
            >
                {Row}
            </List>
        </div>
    );
};

export default LazyLoadedFeedPosts;
