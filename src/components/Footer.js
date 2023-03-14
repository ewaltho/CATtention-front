import React from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, RedditShareButton, RedditIcon} from 'react-share';


export default function Footer () {
    const shareUrl = 'https://cattention.netlify.app/';
const quote = 'Check out this awesome website that helps you focus on work!';
    return (
        <div className='footer'>
            <div className='footer-content'>
                <b>&copy; CATtention 2023 </b>
                <a href='https://github.com/ewaltho/CATtention-front' target="_blank"><img height="30" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg" /></a>
                <FacebookShareButton url={shareUrl} quote={quote}>
                <FacebookIcon size={32} round={true} />
                 Share on Facebook
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} quote={quote}>
                <TwitterIcon size={32} round={true} />
                Share on Twitter
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl} quote={quote}>
                <LinkedinIcon size={32} round={true} />
                Share on LinkedIn
                </LinkedinShareButton>
                <RedditShareButton url={shareUrl} quote={quote}>
                <RedditIcon size={32} round={true} />
                Share on Reddit
                </RedditShareButton>
            </div>
        </div>
    );
}

