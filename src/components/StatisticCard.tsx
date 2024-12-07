import { Card, Statistic } from "antd";

interface StatisticCardProps {
  title: string;
  value: string;
  unit: string;
}

const StatisticCard = ({ title, value, unit }: StatisticCardProps) => {
  return (
    <Card>
      <Statistic title={title} value={value} suffix={unit} />
    </Card>
  );
};

export default StatisticCard;
