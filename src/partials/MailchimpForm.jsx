import React, { useState } from 'react';

function MailchimpForm() {

  // Local state for email input value
  const [email, setEmail] = useState('');

  // Check if email is valid (simple check, you can improve this!)
  const isValidEmail = email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);


  console.log("email : " + email)

  const registerUser = async (currentUser) => {
    setLoading(true)
    try {
      const { data } = await axios.post("https://seashell-app-2-n2die.ondigitalocean.app/api/v1/auth/register", currentUser);
      const { user, token } = data;

    } catch (error) {
      // alert(error.response.data.msg)
      setMessage(error.response.data.msg)
    }
    setLoading(false)
  };

  return (
    <div id="mc_embed_shell">
      <div id="mc_embed_signup">
        <form
          action="https://sweeet.us18.list-manage.com/subscribe/post?u=532a5c562403eba5ad2517042&amp;id=32901198d8&amp;f_id=001123e7f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_self"
        >
          <div id="mc_embed_signup_scroll" className="mt-6 sm:flex sm:max-w-md">
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL" className="sr-only">Email Address</label>
              <input
                type="email"
                name="EMAIL"
                id="mce-EMAIL"
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                placeholder="Enter your email"
                required
                value={email}  // Set input value to state value
                onChange={(e) => setEmail(e.target.value)}  // Update state on change
              />
            </div>
            <div id="mce-responses" className="clear">
              <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
              <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
            </div>
            <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
              <input type="text" name="b_532a5c562403eba5ad2517042_32901198d8" tabIndex="-1" value="" />
            </div>
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <input
                type="submit"
                name="subscribe"
                id="mc-embedded-subscribe"
                className={`flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${!isValidEmail ? 'cursor-not-allowed opacity-50' : ''}`}
                value="Subscribe"
                disabled={!isValidEmail}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MailchimpForm;


