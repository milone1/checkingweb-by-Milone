import './sectionFooter.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';

const FooterSection = () => {
    return (
        <footer>
            <div className="footer-content">
                <h3>TITLE</h3>
                <p>Lorem lorem lrorem lorem lorem </p>
                <ul className='socials'>
                    <li><a href="#"><FacebookIcon fontSize='large' /> </a></li>
                    <li><a href="#"><TwitterIcon fontSize='large'/> </a></li>
                    <li><a href="#"><WhatsAppIcon fontSize='large'/> </a></li>
                    <li><a href="#"><YouTubeIcon fontSize='large'/> </a></li>
                </ul>
            </div>
            <div className='footer-bottom'>
                <p>copyrigth &copy; 2022 checkingweb. desing by <span>M</span></p>
            </div>
        </footer>
    );
}

export default FooterSection;