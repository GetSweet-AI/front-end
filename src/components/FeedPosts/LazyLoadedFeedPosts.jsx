import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import FeedPostCard from '../../partials/FeedPostCard';
import noData from '../../images/NoData.svg';
import isMobile from 'is-mobile';

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
    isConnected,
    feedPosts

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
        // Adjust the style to include margin for spacing between items
        const adjustedStyle = {
            ...style,
            // marginBottom: "10px", // Add a bottom margin to each item for spacing
        };

        return (
            <div key={post._id} style={style}>
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

    const isMobileDevice = isMobile()

    console.log(isMobileDevice)





    return (
        <List
            height={900} // Dynamic height based on content length
            itemCount={visiblePosts.length} // Total number of visible posts
            itemSize={isMobileDevice ? 680 : 420} // Height of each item including the margin
            onItemsRendered={({ visibleRowStartIndex, visibleRowStopIndex }) => {
                // Load more posts at the end of the list
                if (visibleRowStopIndex === visiblePosts.length - 1) {
                    loadVisiblePosts();
                }
            }}
            className='display '
        >
            {Row}
        </List>

    );
};

export default LazyLoadedFeedPosts;
