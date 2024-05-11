import Navbar from "../Components/Navbar";
import Routers from "../Routes/Routers";

const Layout = () => {
  return (
    <main className="h-screen">
      <Navbar />
      <section>
        <Routers />
      </section>
    </main>
  );
};

export default Layout;
