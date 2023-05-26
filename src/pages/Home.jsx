import React from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

function Home() {
  return (

    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Home;