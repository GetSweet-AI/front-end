import React, { useState, useEffect, useCallback } from 'react';
import { VariableSizeList as List } from 'react-window';
import FeedPostCard from '../../partials/FeedPostCard';
import isMobile from 'is-mobile';

const LazyLoadedFeedPosts = ({ filteredFeedPosts, deletePostFeed, handleCopyText, downloadVideo, brandEngagementData, clientConnect, getClientConnectData, clientConnectData, isConnected }) => {
    const [visiblePosts, setVisiblePosts] = useState([]);

    useEffect(() => {
        loadVisiblePosts();
    }, [filteredFeedPosts]);

    const loadVisiblePosts = () => {
        const startIndex = visiblePosts.length;
        const endIndex = startIndex + 10; // Load 10 posts at a time
        const postsToLoad = filteredFeedPosts.slice(startIndex, endIndex);
        setVisiblePosts(prevPosts => [...prevPosts, ...postsToLoad]);
    };

    const getItemSize = index => isMobile() ? 680 : 420; // Size depends on whether the device is mobile

    const Row = ({ index, style }) => {
        const post = visiblePosts[index];
        return (
            <div key={post._id} style={style}>
                <FeedPostCard
                    feedPostId={post._id}
                    MediaUrl={post.MediaUrl}
                    deleteFeedPost={deletePostFeed}
                    Caption={post.Caption}
                    Date={post.Date}
                    unixTimestamp={post.unixTimestamp}
                    handleCopyText={handleCopyText}
                    DownloadButton={downloadVideo}
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
        const item = filteredFeedPosts[0];
        return <FeedPostCard {...item} deleteFeedPost={deletePostFeed} handleCopyText={handleCopyText} DownloadButton={downloadVideo} />;
    }

    return (
        <List
            height={900}
            itemCount={visiblePosts.length}
            itemSize={getItemSize}
            onItemsRendered={({ visibleRowStartIndex, visibleRowStopIndex }) => {
                if (visibleRowStopIndex === visiblePosts.length - 1) {
                    loadVisiblePosts();
                }
            }}
            className='display'
        >
            {Row}
        </List>
    );
};

export default LazyLoadedFeedPosts;
