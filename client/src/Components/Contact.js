import React, { useState } from 'react';
import axios from 'axios'
import emailValidator from 'email-validator'

const Contact = ({ data }) => {

   const { name, phone, contactmessage, address: { street, city, state, zip } } = data
   const initialState = {
      contactName: '',
      contactEmail: '',
      contactSubject: '',
      contactMessage: ''
   }
   const [formData, setformData] = useState(initialState)
   const [response, setResponse] = useState({
      isSuccess: true,
      message: '',
      errors: []
   })

   const handleChange = (e) => setformData({ ...formData, [e.target.name]: e.target.value })

   const sendEmail = async (e) => {
      e.preventDefault()
      try {
         if (emailValidator.validate(formData.contactEmail)) {
            const res = await axios.post('/', formData)
            
            if (res.status === 200) {
               setResponse({ ...response, isSuccess: true, message: res.data })
               setformData(initialState)
            }
            else {
               setResponse({ ...response, isSuccess: false, errors: [...response.errors,"Something went wrong !!!"] })
            }
         }
         else {
            setResponse({ ...response, isSuccess: false, errors: [...response.errors, 'Please enter a valid email address'] })
         }

         setTimeout(() => setResponse({
            message: '', errors: []
         }), 6000)

      } catch (error) {
         let errors = error.response.data.errors.map(e => e.msg)
         setResponse({ isSuccess: false, errors: errors })
         setTimeout(() => setResponse({
            message: '', errors: []
         }), 6000)
      }
   }

   return (
      <section id="contact">
         <div className="row section-head">
            <div className="two columns header-col">
               <h1><span>Get In Touch.</span></h1>
            </div>
            <div className="ten columns">
               <p className="lead">{contactmessage}</p>
            </div>
         </div>
         <div className="row">
            <div className="eight columns">
               <form onSubmit={e => sendEmail(e)} id="contactForm" name="contactForm">
                  <fieldset>
                     <div>
                        <label htmlFor="contactName">Name <span className="required">*</span></label>
                        <input type="text" value={formData.contactName} size="35" id="contactName" name="contactName" onChange={e => handleChange(e)} />
                     </div>

                     <div>
                        <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                        <input type="text" value={formData.contactEmail} size="35" id="contactEmail" name="contactEmail" onChange={e => handleChange(e)} />
                     </div>

                     <div>
                        <label htmlFor="contactSubject">Subject</label>
                        <input type="text" value={formData.contactSubject} size="35" id="contactSubject" name="contactSubject" onChange={e => handleChange(e)} />
                     </div>

                     <div>
                        <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                        <textarea cols="50" rows="15" value={formData.contactMessage} id="contactMessage" name="contactMessage" onChange={e => handleChange(e)} ></textarea>
                     </div>

                     <div>
                        <button className="submit">Submit</button>
                        {/* <span id="image-loader">
                           <img alt="" src="images/loader.gif" />
                        </span> */}
                     </div>
                  </fieldset>

               </form>

               {response && (response.isSuccess ?
                  response.message && <div id="message-success">
                     <i className="fa fa-check"></i>{response.message}<br />
                  </div> : response.errors && response.errors.length > 0 &&
                  response.errors.map((e, i) => < div key={i} id="message-warning">{e}</div>))
               }



            </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

                  <h4>Address and Phone</h4>
                  <p className="address">
                     {name}<br />
                     {street} <br />
                     {city}, {state} {zip}<br />
                     <span>{phone}</span>
                  </p>
               </div>
            </aside>
         </div>
      </section >
   );
}


export default Contact;
