import React from 'react';

const About = ({ data }) => {

   if (data) {
      const { name, bio, email, address: { street, city, state, zip } } = data
      const profilepic = "images/" + data.image;

      return (
         <section id="about">
            <div className="row">
               <div className="three columns">
                  <img className="profile-pic" src={profilepic} alt="Profile Pic" />
               </div>
               <div className="nine columns main-col">
                  <h2>About Me</h2>

                  <p>{bio}</p>
                  <div className="row">
                     <div className="columns contact-details">
                        <h2>Contact Details</h2>
                        <p className="address">
                           <span>{name}</span><br />
                           <span>{street}<br />
                              {city} {state}, {zip}
                           </span><br />
                           <span>{email}</span>
                        </p>
                     </div>
                     {/* <div className="columns download">
                        <p>
                           <a href={resumeDownload} className="button"><i className="fa fa-download"></i>Download Resume</a>
                        </p>
                     </div> */}
                  </div>
               </div>
            </div>

         </section>
      );
   }
}


export default About;
