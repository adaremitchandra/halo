import { Card, Col, Row } from "antd";
import CardItem from "../components/organism/atoms/CardItem";
import PageLayout from "../components/organism/PageLayout";

const Home = () => {
  return (
    <PageLayout>
      <Row gutter={[16, 24]}>
        <CardItem title="Order" body="Create New Order" href="/order" />
        <CardItem title="Books" body="Available Books : 180" href="/books" />
        <CardItem
          title="Transaction history"
          body="Total Transaction : 60"
          href="/transaction-history"
        />
      </Row>
    </PageLayout>
  );
};

export default Home;
