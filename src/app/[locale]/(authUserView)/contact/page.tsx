import React from "react";

export default function Contact(): JSX.Element {
  return (
    <div className="container margin-top-20px dark:text-white">
      <main className="contact-main">
        <b>Contact page</b>
        <div className="contactInfo">
          <ul>
            <li>
              <b>ტესტ კომპანია</b>
            </li>
            <li>მისამართი: ნუცუბიძის ქუჩა</li>
            <li>phone: +995 ...</li>
            <li>e-mail: e-mail@e-mail.ge</li>
            <li>დაგვიტოთ საკონტაქტო:</li>
            <li>
              სახლი <input type="text" />
            </li>
            <li>
              ტელეფონი <input type="tel" />
            </li>
            <li>
              მეილი <input type="email" />
            </li>
            <li>
              <button>submit</button>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
