import React from "react"
export class TwitterFeed extends React.Component {
    constructor () {
        super()
        this.state = { 
            tweets: [],
            count: 10,
        }
    }

    componentDidMount = async () => {
        const tweets = await fetch(`api/getTweets?count=${this.state.count}`).then(res => res.json())
        this.setState({ tweets })
    }

    render () {
        const { tweets } = this.state
        return tweets.length 
            ? (<div 
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    overflow: 'auto',
                    maxHeight: 'calc(100vh - 136.5px)'
                }}>
                {tweets.map(tweet => {
                    const rt = !!tweet.retweeted_status
                    const text = rt
                        ? tweet.retweeted_status.full_text.split('https://')[0]
                        : tweet.full_text.split('https://')[0]
                    const tweetImg = <img src="/assets/images/tweet.svg" style={{ float: 'right' }} />
                    const infoLink = 
                        <a target="_blank" style={{ float: 'right' }} href="https://help.twitter.com/en/twitter-for-websites-ads-info-and-privacy?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Escreen-name%3As_pop3%7Ctwcon%5Es1">
                            <img src="/assets/images/info.svg" alt="info"/>
                        </a>
                    const profileImg = rt
                        ? tweet.retweeted_status.user.profile_image_url_https
                        : tweet.user.profile_image_url_https
                    const name = rt
                        ? tweet.retweeted_status.user.name
                        : tweet.user.name
                    const screenName = rt
                        ? tweet.retweeted_status.user.screen_name
                        : tweet.user.screen_name
                    const created = rt
                        ? tweet.retweeted_status.created_at
                        : tweet.created_at
                    const entities = rt
                        ? tweet.retweeted_status.entities && tweet.retweeted_status.entities.urls.map(entity => (
                            <p key={entity.url}><a href={entity.url} style={{ overflowWrap: 'break-word' }}>{entity.display_url}</a></p>
                        ))
                        : tweet.entities && tweet.entities.urls.map(entity => (
                            <p key={entity.url}><a href={entity.url} style={{ overflowWrap: 'break-word' }}>{entity.display_url}</a></p>
                        ))
                    const extendedEntities = rt
                        ? tweet.retweeted_status.extended_entities && tweet.retweeted_status.extended_entities.media.map((entity, _idx, arr) => (
                            <img key={entity.id} src={entity.media_url_https} width={`${100 / arr.length}%`} style={{ borderRadius: 10 }} alt="image"/>
                        ))
                        : tweet.extended_entities && tweet.extended_entities.media.map((entity, _idx, arr) => (
                            <img key={entity.id} src={entity.media_url_https} alt="image" width={`${100 / arr.length}%`} style={{ borderRadius: 10 }} />
                        ))
                    const favorites = rt
                        ? tweet.retweeted_status.favorite_count
                        : tweet.favorite_count
                    return (
                        <div
                            key={tweet.id}
                            id={`tweet-${tweet.id}`}
                            style={{ 
                                border: 'solid #999',
                                margin: 10,
                                borderRadius: 5,
                                padding: 10,
                            }}
                            onClick={() => window.open(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`, '_blank').focus()}
                            onMouseOver={() => document.getElementById(`tweet-${tweet.id}`).classList.add('tweet-hover')}
                            onMouseLeave={() => document.getElementById(`tweet-${tweet.id}`).classList.remove('tweet-hover')}
                        >
                            {tweetImg}
                            {rt && <p style={{ margin: '0 0 10px 0' }}><img src="/assets/images/retweet.png" width={15} alt="retweet" />{`${tweet.user.name} retweeted`}</p>}
                            <img src={profileImg} alt="profile image" style={{ borderRadius: '25px' }} />
                            <span><strong>{name}</strong>{` @${screenName} - ${new Date(created).toLocaleDateString()}`}</span>
                            <p>{text}</p>
                            {entities}
                            {extendedEntities}
                            <span>{`❤ ${favorites > 0 ? favorites : ''}`}</span>
                            {infoLink}
                        </div>
                )})}
                <button
                    id="tweet-btn"
                    onClick={async () => this.setState({
                        count: this.state.count + 10,
                        tweets: await fetch(`api/getTweets?count=${this.state.count + 10}`).then(res => res.json())
                    })}
                    onMouseOver={() => document.getElementById(`tweet-btn`).classList.add('tweet-hover')}
                    onMouseLeave={() => document.getElementById(`tweet-btn`).classList.remove('tweet-hover')}
                    style={{
                        borderColor: "#1DA1F2",
                        color: "#1DA1F2",
                        borderRadius: "15px",
                        padding: "10px",
                        margin: "10px 20px 20px"
                    }}>
                    load more
                </button>
            </div>) 
            : (
                <div
                    style={{ 
                        textAlign: 'center',
                        margin: 10,
                        padding: 10,
                        border: 'dotted #aaa',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                    }}>
                    <span>loading tweets...</span>
                </div>
            )
    }
}