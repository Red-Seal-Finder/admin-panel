import Customers from "@/features/customers";
import Jobs from "@/features/jobs";
import Layout from "@/features/layout/layout";
import Overview from "@/features/overview";

const Home = () => {
  return (
    <>
      <Layout>
        <Overview />
        {/* <Jobs /> */}
        {/* <Customers /> */}
      </Layout>
    </>
  );
};

export default Home;
