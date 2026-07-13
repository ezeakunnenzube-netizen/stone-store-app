import "./Footer.css"
import {Link} from "react-router-dom"
import { Mail,Phone,Search, User, ShoppingBag, ArrowRight,Shield, Truck, Gem, Calculator,Clock, MapPin } from "lucide-react";
import stonelogo from '../stone-logo.png'
import stonelogo1 from '../sonic stone logo1.png'
function Footer(){
     return(
      <div className='footer'>
        <section className="home-last-section">
        <div className="text-boxes">
          <div className="text-box1">
            <div className="logo-div-text"> 
            
            <p className='logo-text-footer'>
              Stone's Store
            </p> 
            </div> 
            <p className="text-box1-paragraph">Premium natural stone and marble tiles for modern architectural spaces.</p>
          </div>
          <div className="text-box2">
            <p className="text-box-title">COLLECTION</p>
            <p className="text-box2-paragraph">Floor Tiles</p>
            <p className="text-box2-paragraph">Wall Tiles</p>
            <p className='text-box2-paragraph'>Natural Marble</p>
            <p className='text-box2-paragraph'>Procelain</p>
          </div>
          <div className="text-box3">
            <p className="text-box-title">COMPANY</p>
            <p className="text-box3-paragraph">Our Story</p>
            <p className="text-box3-paragraph">Contact Us</p>
            <p className="text-box3-paragraph">Calculator</p>
          </div>
          <div className="text-box4">
            <p className="text-box-title">VISIT US</p>
            <div className='address'>
            <MapPin className='address-icon'/>
            <p className="contact-address-line"><span>123 Stone Way, Quarry District</span></p>
            </div>
            <div className="time">
              <Clock className="clock-icon"/>
               <p className="monday-to-friday"> Mon - Fri: 9:00 - 18:00</p>
            </div>
          </div>        
        </div>
        <div className='section-divider-div'>
        <hr className='section-divider'/>
        </div>
      </section>
      <section className='footer'>
        <p className='footer-paragraph'>
          © 2026 Sonic Stone Maintenance Limited. All rights reserved.
        </p>
      </section>
      </div>
     )
}
export default Footer