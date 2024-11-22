import React from "react";

export default function Footer(): JSX.Element {
  return (
    <footer className="flex bg-gray-50 dark:bg-zinc-900 dark:text-white footer text-center justify-evenly">
      <section>
        <b>ჩვენ შესახებ</b>
        <div>მოსაყოლი ბევრია ...</div>
      </section>

      <section>
        <b>პროდუქტები</b>
        <div>ყავა და ლუდი</div>
      </section>

      <section>
        <b>კონტაქტი</b>
        <div>mail@mail.ge T: +995 ...</div>
      </section>
    </footer>
  );
}
