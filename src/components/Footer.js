import React from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, RedditShareButton, RedditIcon} from 'react-share';
import { useLocation} from "react-router-dom";


export default function Footer () {
    const currentlocation = useLocation();
    const shareUrl = 'https://cattention.netlify.app/';
const quote = 'Check out this awesome website that helps you focus on work!';
    if (currentlocation.pathname != "/community") {
        return (
            <div className='footer'>
                <div className='footer-content'>
                    <FacebookShareButton url={shareUrl} quote={quote}>
                    <FacebookIcon size={32} round={true} />
                    Share on Facebook
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl} quote={quote}>
                    <TwitterIcon size={32} round={true} />
                    Share on Twitter
                    </TwitterShareButton>
                    <b>&copy; CATtention 2023 </b>
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
}

